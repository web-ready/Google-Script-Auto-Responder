# AutoReplyUsingEmailInSubject - Google Script Auto Responder

## Overview

This script automatically sends a reply to emails based on an email address found in the subject line. It’s designed to work with Gmail labels, particularly for incoming inquiries labeled as **"AutoReply_WebsiteLead"**. Once a response is sent, the email thread is moved to a **"Respond_To"** label for further follow-up.

## How It Works

1. **Label Setup**: 
   - The script looks for two Gmail labels:
     - **"AutoReply_WebsiteLead"**: This label is applied to incoming emails that require an auto-reply.
     - **"Respond_To"**: This label is applied to threads after a response has been sent, so you can track which inquiries need further action.
   - Ensure these labels are created in Gmail before running the script.

2. **Email Extraction**:
   - The script extracts an email address enclosed within `< >` from the subject line of the latest message in a thread.
   
3. **Auto-Reply**:
   - If a valid email address is found, an automatic reply is sent with a predefined message. The reply is formatted in HTML for better presentation.

4. **Thread Management**:
   - After sending the auto-reply, the thread is moved from **"AutoReply_WebsiteLead"** to **"Respond_To"** for future follow-up.

## Prerequisites

- **Gmail Labels**:
  - "AutoReply_WebsiteLead" (for incoming inquiries).
  - "Respond_To" (for threads that need follow-up after the auto-reply).
  
- **Subject Line Format**:
  - The script expects the subject to contain the email address enclosed in `< >`. For example: `Inquiry from <example@email.com>`.

## How to Use

1. Create the Gmail labels: **"AutoReply_WebsiteLead"** and **"Respond_To"**.
2. Add the script to your Google Apps Script editor.
3. Set a trigger to run the script automatically, such as every few minutes using **Triggers** in the Google Apps Script settings.
4. Incoming emails labeled as **"AutoReply_WebsiteLead"** will be processed and auto-replied based on the email address extracted from the subject.

## Customization

- **Reply Message**: 
  - The auto-reply message can be customized in the `response` variable inside the script.
- **Email Extraction**: 
  - The script looks for an email address enclosed in `< >` in the subject line. Adjust the regular expression if the format is different.
