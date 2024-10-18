function autoReplyUsingEmailInSubject() {
  var incomingLabel = GmailApp.getUserLabelByName("AutoReply_WebsiteLead");
  var respondToLabel = GmailApp.getUserLabelByName("Respond_To");

  if (!incomingLabel) {
    Logger.log("Label 'AutoReply_WebsiteLead' not found.");
    return;
  }
  if (!respondToLabel) {
    Logger.log("Label 'Respond_To' not found. Please create it.");
    return;
  }

  var threads = incomingLabel.getThreads();

  if (!threads.length) {
    Logger.log("No threads found with the specified label.");
    return;
  }

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    var lastMessage = messages[messages.length - 1]; // Get the last message in the thread
    var subject = lastMessage.getSubject(); // Gets the subject of the message

    // Extract email address from the subject
    var emailPattern = /<([^>]+)>/; // Regular expression to find email within <>
    var matches = subject.match(emailPattern);
    var emailToReply = matches ? matches[1] : null;

    if (emailToReply) {
      Logger.log("Extracted Email to Reply to: " + emailToReply); // Debug: Log the extracted email

      var response = "Hello,\n\n" +
        "Thank you for reaching out to us at Web-Ready! We have successfully received your inquiry and are looking forward to addressing your needs. We aim to respond to all queries within one business day.\n\n" +
        "Should you have any immediate questions or require further assistance in the meantime, please do not hesitate to reply to this email. Our team is here to support you and will get back to you as promptly as possible.\n\n" +
        "Warm regards,\n" +
        "The Web-Ready Support Team";

      // Send the response using the predefined response text
      GmailApp.sendEmail(emailToReply, "Thank You for Contacting Web-Ready!", "", {
        htmlBody: response.replace(/\n/g, '<br>') // Simple conversion to HTML for nicer formatting
      });

      // Move thread to the "Respond_To" label and remove from "AutoReply_WebsiteLead"
      threads[i].removeLabel(incomingLabel).addLabel(respondToLabel);
    } else {
      Logger.log("No valid email address found in the subject line for the message: " + subject); // Debug: Log if no email found
    }
  }
}
