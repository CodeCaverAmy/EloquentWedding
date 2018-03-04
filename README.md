# EloquentWedding
A static website for my client who is a wedding officient: www.eloquentwedding.com

**Domain Registered at:** [Namecat](http://namecat.com)

## Hosting on [Surge](http://surge.sh)
Surge is a fantastic way to quickly publish a static site for free, and its super easy!

  * Make sure node is installed ````npm install --global surge````
  * Then type in the command ````surge````
  * Follow the prompts, using whatever you want for the domina name (ending in surge.sh)
  * Save your domain name (so you don't have to type it in each time) in a CNAME file ````echo domain.surge.sh > CNAME````
  * Use your own custom domain name - set the hostnames @ and www to: ````na-west1.surge.sh````
  * Redirect **http** to **https** ````surge --domain https://domain.surge.sh````
  * Use any of the following plugins: 
    * [Grunt](http://surge.sh/help/deploying-a-grunt-project)
    * [Gulp](https://github.com/surge-sh/gulp-surge)
    * [Git Hooks](http://surge.sh/help/deploying-continuously-using-git-hooks)
    * [npm run scripts](http://surge.sh/help/getting-started-with-surge)
    * [Jekyll](http://surge.sh/help/deploying-a-jekyll-project)
    * [Node.js](http://surge.sh/help/getting-started-with-surge)
  * Remove your site if you no longer want Surge hosting it: ````surge teardown domain.surge.sh````

## Form Submission using [Formspree](https://formspree.io)
Since there is a contact form on the site that originally required PHP, I switched over to using [Formspree](https://formspree.io)

Formspress is free, but I handed out the $9.99 / month for the **Gold** account, mostly because I wanted to use AJAX to handle my form. It also allows me to use multiple email addresses and forms with a single account.
### Setting up AJAX
````
$.ajax({
    url: "https://formspree.io/FORM_ID", 
    method: "POST",
    data: {message: "hello!"},
    dataType: "json"
});
````
In addition to the inputs in the form, the following can be passed in (via the form or within the AJAX)
  * **_replyto**: passed along with the form submission to enable the ability to reply to this address
  * **_next**: bypasses the default redirect to spree's confirmation page
  * **_subject**: provides the subject for the email
  * **_cc**: copy other participants for the form
  * **_gotcha**: into the form as a hidden field to avoid spam by fooling scrapers
    
    
