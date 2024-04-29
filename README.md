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

### Common Grounds

- Automatically upgrade WordPress versions for users running below version 6.2, ensuring security and performance improvements.
- Initialize WordPress options, permalinks, and configurations to ensure a consistent setup across users.
- Provide functions to redirect users after login, ensuring a smooth transition and a complete onboarding experience.
- Install various plugins and themes dynamically based on user requirements, enhancing customization options.
- Show a completely different experience to users based on the brands they are redirected from, enhancing brand consistency and personalization.
- Send various events according to user selections, enabling tracking and analytics for user behavior.
- Interact with the Onboarding Data Module for various operations and tasks, ensuring seamless user experience.

### Default Flow [wp-setup]

- Defines appropriate Primary and Secondary categories in the Site Classification section within the Data Module.
- Incorporate the title, description, and logo supplied by the user for their WordPress site.
- Transition to an ecommerce flow if the user selects "Selling" as the Top Priority Step.
- Produce themes featuring templates such as headers, homepages, and supplementary pages, tailored to the user's preferences, including selected colors and fonts.

### Ecommerce Flow [ecommerce]

- This flow has supplementary stages, including address input, tax particulars, and product configuration.
- User-provided address details are seamlessly integrated into the WooCommerce plugin, with the default currency adapted based on user selections.
- The Tax step facilitates the establishment of default tax calculation preferences.
- The Products step, users can define the type and quantity of products they intend to sell.

### Sitegen Flow [sitegen]

- Users are presented with the option to proceed through either the standard DIY process or the cutting-edge Sitegen Flow.
- Users have the capability to integrate their Facebook accounts to elevate the website creation experience.
- Many pivotal elements of the site are synthesized through AI calls.
- Users are presented with various iterations of their site and have the ability to generate multiple versions with distinct styles.
- They can personalize the visual aspects of the website, including color schemes, typography, and even the theme name.
- A customized child theme is created based on the user's preferences, accompanied by a live preview showcasing the website's appearance.

## Critical Paths

### Common Grounds

   - Users should be automatically redirected to the onboarding process the first time they log in to wp-admin.
   - Subsequent logins to WordPress should not display the onboarding process for users who have completed it previously.
   - Users should be guided to upgrade the WordPress version if it is less than 6.2.
   - Users should experience a brand-specific interface, displaying different brand logos and colors tailored to their brand affiliation.
   - The child theme generated should reflect the choices made by the user during their onboarding experience.

### Default Flow [wp-setup]

- Primary and secondary classifications should be promptly established in the SiteClassification option upon the user's selection.
- The workflow should seamlessly switch when the user prioritizes "Selling" in the Top Priority step.
- Users should be presented with a choice between Wonder Blocks or YITH Wonder Live Previews options.
- The Live preview should vividly illustrate the user's selections, providing a visual depiction of the site's appearance.

### Sitegen Flow [sitegen]

- Ensure that all Site meta requests are executed concurrently and that data processing proceeds smoothly.
- Validate the functionality of all live previews, showcasing various iterations of the site.
- Generate and publish additional pages according to the user's instructions.
- Apply the chosen color schemes and fonts, allowing users to observe immediate updates reflected in their live previews.
- Upload large AI-generated images into WordPress media and incorporate the new WordPress links into their respective contexts.
- Generate screenshots tailored to the user's preferences and create a child theme using the provided name.

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
