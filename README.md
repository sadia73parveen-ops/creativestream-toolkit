# MediaDrop Toolkit

Build a production-quality responsive SaaS website called MediaDrop.

MediaDrop is an online creator toolkit for YouTubers, TikTok creators, Instagram creators, bloggers, and social-media marketers.

Create a clean, modern interface with a blue/purple visual identity.

Core tools for the MVP

AI YouTube Title Generator

AI Social Media Caption Generator

AI Hashtag Generator

Image Compressor

Image Resizer

Homepage

Create:

Navigation bar

MediaDrop logo

Hero section

"Free Tools for Content Creators" headline

Short description

Search/tools input

Popular tools section

Benefits section

How it works

FAQ

Footer

Tool pages

Create separate SEO-friendly routes:

/ai-youtube-title-generator
/social-media-caption-generator
/hashtag-generator
/image-compressor
/image-resizer

Every tool page should contain:

Tool interface

Clear instructions

Example usage

FAQ

Related tools

SEO title and meta description

AI tools

Create secure server-side API routes for AI requests.

Never expose API keys in frontend JavaScript.

Add:

Input validation

Rate limiting

Loading states

Error states

Usage limits

Use environment variables for API credentials.

Image tools

Implement client/server-side image processing where practical.

Allow users to:

Upload images

Compress images

Resize images

Preview results

Download processed files

Validate file type and file size.

Accounts

Structure the application so authentication can be added using Supabase.

Create free and Pro usage concepts.

Free users should have limited AI generations.

Pro users should have higher limits and additional features.

Pricing

Create a pricing page with:

FREE

Limited daily AI generations

Basic tools

Ads can be added later

PRO

$7/month

Higher AI limits

No ads

Generation history

Premium features

BUSINESS

$19/month

Higher limits

API access

Priority processing

Do not implement fake payments. Structure the code so Stripe can be integrated later.

SEO

Implement:

Proper metadata

Open Graph metadata

Sitemap

robots.txt

Canonical URLs

Structured FAQ data where appropriate

Semantic HTML

Fast loading

Mobile-first design

Security

Implement:

Input sanitization

File type validation

File size limits

Rate limiting

Secure API routes

Temporary-file cleanup

No exposed API keys

Design

Use:

Next.js

React

Tailwind CSS

Modern cards

Rounded corners

Subtle shadows

Responsive design

Light/dark mode

Accessible buttons and forms

The result should look like a real commercial SaaS product, not a basic template.

Make the code modular so additional creator tools can easily be added later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ab30b849-07cb-4ac5-b2df-e63473dde358).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
