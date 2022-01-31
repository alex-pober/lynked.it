# Lynked.it

Lynked.it is mostly a clone of Linktree, but this clone was made with restaurants in mind. This web app gives you option to link menu PDFs and Images so diners can easily view all of them from their phone on a single page.

You can check it out here: [Lynked.it](https://lynked-it.herokuapp.com/)

Additional info:
[Database Schema](https://github.com/alex-pober/lynked.it/wiki/Database-Schema)

## Screenshots
Landing Page
![enter image description here](https://i.imgur.com/D5iA2mw.png)

Managing Links Page
![enter image description here](https://i.imgur.com/YQY7Rzu.png)

Managing Menus Page
![enter image description here](https://i.imgur.com/wbJwkzi.png)

All links view
![enter image description here](https://i.imgur.com/ai8OA9Q.png)
## Features
-   Sign up/in
-   Create/Read/Update/Delete Links to any site
-   Create/Read/Update/Delete Menu Links to any pdf or Image
-   Real time render preview of how public profile will look on mobile
-   Change Profile Picture
-   Change Background Picture
-   Fully terminate account, which deletes all data associated with it
-   Public profile with links is made to work on mobile phones
-  Menus pdfs are generated on google docs so its available across all browsers

## Technologies Used
- React.js
- Redux
- PostgreSQL
- Flask
- WTForms
- JavaScript
- Python
- JSON API
- Docker
- Heroku

## Technical Details
One of the hardest things was to make embedded pdf links work across all browsers and all mobile phone. `<embed>` at first seemed like the proper tag to use to render all PDFs and Image links. Further testing made it clear that it would not work on Safari or mobil. So the other option was to try wrap the embed in Object tag. This worked but would no load image links anymore.
![enter image description here](https://i.imgur.com/IxtfPNv.png)
    Solution that I came up with that works across all website and mobile phones is simple. I made conditional rendering using react which checks if the link contains ".pdf" if it does it renders it in Object tag using google drive. If it doesn't contain .pdf it renders it in IMG tag.
