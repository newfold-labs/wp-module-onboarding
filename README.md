<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# WordPress Onboarding Module
[![Version Number](https://img.shields.io/github/v/release/newfold-labs/wp-module-onboarding?color=77dd77&labelColor=00000&style=for-the-badge)](https://github.com/newfold/wp-module-onboarding/releases)
[![License](https://img.shields.io/github/license/newfold-labs/wp-module-onboarding?labelColor=333333&color=666666&style=for-the-badge)](https://raw.githubusercontent.com/newfold-labs/wp-module-onboarding/master/LICENSE)


The Onboarding module is designed to streamline various tasks related to user onboarding and customization within a WordPress environment. It provides functionalities to enhance user experience, configure settings, install plugins and themes dynamically, and interact with other modules seamlessly.
<br><br>
[![React](https://img.shields.io/badge/Wordpress-21759B?style=for-the-badge&logo=wordpress&logoColor=white)]()
[![React](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)]()
[![React](https://shields.io/badge/react-black?logo=react&style=for-the-badge)]()
<br>
## Module Responsibilities

   - Provide functions to redirect users after login, ensuring a smooth transition and a complete onboarding experience.
   - Install various plugins and themes dynamically based on user requirements, enhancing customization options.
   - Initialize WordPress options, permalinks, and configurations to ensure a consistent setup across users.
   - Automatically upgrade WordPress versions for users running below version 6.2, ensuring security and performance improvements.
   - Show a completely different experience to users based on the brands they are redirected from, enhancing brand consistency and personalization.
   - Generate themes with templates and multiple pages according to user selections, including chosen colors and fonts, enhancing visual customization.
   - Send various events according to user selections, enabling tracking and analytics for user behavior.
   - Interact with the Onboarding Data Module for various operations and tasks, ensuring seamless user experience.

## Critical Paths
   - Users should be automatically redirected to the onboarding process the first time they log in to wp-admin.
   - Subsequent logins to WordPress should not display the onboarding process for users who have completed it previously.
   - Users should be guided to upgrade the WordPress version if it is less than 6.2.
   - Users should experience a brand-specific interface, displaying different brand logos and colors tailored to their brand affiliation.
   - Users should be presented with either the Wonder Blocks or YITH Wonder Live Previews options.
   - The child theme generated should reflect the choices made by the user during their onboarding experience.
   - The user's site should display a title, description, and logo provided during the onboarding process.

## Release Process

### Local Release Preparation

1. **Checkout the trunk branch locally:**
   ```bash
   git checkout trunk
   ```

2. **Ensure trunk is up to date with origin:**
   ```bash
   git pull origin trunk
   ```

3. **Test for any breaking changes and highlight concerns:**
   - **Conduct thorough testing to ensure stability and functionality.**
   - Note any issues or concerns for further action.

4. **Increment version following Semantic Versioning 2.0.0:**
   - Update version in:
     - `bootstrap.php`
     - `package.json`
     - `package-lock.json`
   - Run:
     ```bash
     npm install
     npm run build
     ```
   - Verify existence of `build/<new_version>` folder.

5. **Push changes to origin:**
   ```bash
   git push origin trunk
   ```

### Creating a Release on Github

6. **Create a new release on Github:**
   - Go to: [New Release](https://github.com/newfold-labs/wp-module-onboarding/releases/new)
   - Tag number should match the updated version number.
   - Title: `Version <tag_number>`
   - Generate release notes.
   - Publish Release.

7. **Ensure release tag exists on [Github](https://github.com/newfold-labs/wp-module-onboarding/releases/) and [Satis](https://github.com/newfold-labs/satis/actions).**

### Pull Request and Cypress Testing

8. **Make a branch in the Brand Plugin:**
   - Create a branch `update/onboarding` in the Brand plugin from `develop`.

9. **Update Onboarding version in:**
   - `composer.json`
   - `composer.lock`
   - Run:
     ```bash
     composer update newfold-labs/wp-module-onboarding
     ```

10. **Push changes to the branch and add a small release description in the PR Desc.**

11. **Wait for Cypress test workflow to run:**
    - Ensure all Onboarding tests pass.

12. **If any tests fail, fix them in the module and tag a re-release by deleting the earlier release and tag.**

### Final Steps

13. **Create a bump PR to the master branch of Brand Plugin.**

14. **Send release details notification on WordPress Pillar APAC channel.**

15. **Tag PRESS1 and share link in PRESS 1,2,4 Coordination Code Reviews channel:**
    - Include Release Tag and Bump PR links.

## Installation

### 1. Add the Newfold Satis to your `composer.json`.

 ```bash
 composer config repositories.newfold composer https://newfold-labs.github.io/satis
 ```

### 2. Require the `newfold-labs/wp-module-onboarding` package.

 ```bash
 composer require newfold-labs/wp-module-onboarding
 ```

[More on NewFold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)
