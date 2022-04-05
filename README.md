# WOOFILICIOUS

By: <b> Koh Rui Yun </b>

# 1. Project Summary
The project aims to build an e-commerce website that specialises in selling Dog Food products. Based on estimates, the pet dog population is growing 10% year on year.
Furthermore, trends continues to grow, especially during the pandemic, where dogs would make great companion during this trying time. 
The e-commerce website aims to target the growing market size of dog owners, by selling different types of food considerations to owners. 

  ### Relevant website link
  Website deployment on Heroku: https://woofilicious.herokuapp.com/
  
  <b> For shop owner details (admin) for testing purpose, please refer to section 3.2 on Testing below. </b>
  
# 2. UIUX / Features

  ## 2.1 UIUX
  
   ### 2.1.1 Identifying user stories
   a. As a user, I want to be able to browse different types of dog food for my pet dog. <br>
   b. As a user, I want the convenience of having a one stop shop that sells different types, brands and from various sources (countries). <br>
   c. As a user, I want an e-commerce platform that would remember my details for ease of purchase in the future.
   
   ### 2.1.2 Acceptance criteria
   a. The e-commerce website features a product page, that allows filtering of criterias. <br>
   b. The e-commerce website allows clicking into a product to obtain further details. <br>
   c. The e-commerce website allows user registration and log in, to remember member's information for their ease. <br>   
   
   ### 2.1.3 Wireframe and Five Planes of UI/UX
   The main feature of the front-end application of this project is the 'Products' page that displays all available products for sale. 
   <li> Surface: The visual design of the Home page (the page which users first see when they enter website) displays an attention grabbing 
        banner that take up the full view size. <br>
        The whole website features various colours, many on the bright side (bright blue) and colourful dog pictures and product images. 
        This serves the purpose to grab potential customer's attention, to increase the chances of selling products. </br>
        Furthermore, colours were properly chosen to ensure readability. Colour combinations were made sure not to cause distress to customers due to clashing colour themes.
   </li>
   <li> Skeleton: For ease of navigating through the webpage, the Navbar being used as the main navigator. </li>
   <li> Structure: Each product is contained within a card format. Within each card shows user a product image, name and price. They are able to click to view more details. </li>   

  ## 2.2 Features
  
  You may refer to the uploaded document for screenshots of the e-commerce website features, to view concurrently with the table below: [features.pdf](https://github.com/ruiyunkoh/woofilicious/files/8418846/features.pdf)

  
  |  #  | Feature Description    | Fig ref           |
  | :---|:---------------------- |:----------------- |
  |1| The website is created on a Single Page Application. | |
  |2| The main feature of this webpage would be the Products page - which displays all dog food products listed. |Fig 2|
  |3| The products page has a search and filter function based on various criterias, up to the users. |Fig 2|
  |4| Every product is featured within a card format, with its information summarised. Each card has its own Add to Cart, Edit and Delete buttons. The add to Cart feature is only available to users logged in. The Edit and Delete product feature is only available to the show Owner (admin). |Fig 2|
  |5| Owner can create posting by selecting the 'Add more products' button at the bottom of products page. A posting creation form will appear. Form validation exists to ensure all fields are filled in before the form is successfully submitted. Upon successful submission, users are redirected back to 'Products' page, with an alert to inform on the submission. |Fig 3|
  |6| Owner can edit individual postings by selecting the edit icon within the card. This brings owner to a form page (with all existing fields filled up). Form validation exists to ensure all fields are filled in before the form is successfully submitted. Upon successful Edit, users are redirected back to 'Products' page, with an alert to inform on the Edit. |Fig 4|
  |7| Users can click on the title of individual posting to be redirected to a page showing detailed product information. An add to cart button is also available in this page. |Fig 5|
  |8| Owner can delete individual posting. This brings the owner to a confirmation page to prevent accidental deletion. Upon successful Deletion, Owner is redirected back to 'Products' page, with an alert to inform on the Deletion. Cancellation of this process will also redirect Owner back to the Products page. |Fig 6|
  |9| Upon signing in, the website would greet the user by their username. Users are also able to view their profile (which is not available if they are not logged in. |Fig 7|
  |10| E-commerce website features a log in page and form. Within the log in page, it also has a button to direct new users to register if they do not have an account. |Fig 8|
  |11| New users can create an account by clicking on the register button. Form validation exists to ensure all fields are filled in and 'Password' and 'Confirm Password' fields matches, before the form is successfully submitted. By default, created accounts are 'users'. To change to admin, it has to be done backend by changing the data field. |Fig 9|
  |12| Logged in users are able to add products into the shopping cart. Shopping cart shows products added in a list format, for each product. Users are able to amend product quantity and remove product from cart. Finally, check out button exists to redirect users to payment gateway. Checkout option is blacked out if there is no item in the cart.|Fig 10|
  |13| Website is mobile responsive. |Fig 11|
  |14| Order tab is only visible to Owner. |Fig 12|
  |15| Owner can filter the orders via 2 options: (i) Order status (ii) Month created. |Fig 13|
  |16| Owner can change the order status via the drop down option. The page will be redirected to refresh to recognise the change. |Fig 13|
  |17| By clicking on the "view details" link of each order (in the main order management table), Owner can view the details of the order. This includes the breakdown of items ordered (product name, quantity, cost). |Fig 14|
  
# 3. Implementation

 ## 3.1 Technology used
 <li> JavaScript, MySQL and Express </li>
 <li> Gitpod </li>
 <li> Heroku </li>
 <li> Node JS, Yarn </li>
 <li> Bootstrap </li>
 <li> Bookshelf (ORM) </li>
 <li> Caolan Form for forms template </li>
 <li> Stripe payment gateway </li>
 
 ## 3.2 Testing
 
 <b> For the purpose of this project, I have created an account for shop owner (admin). <br>
 User details - <br>
 Email: abc@woofilicious.com <br>
 Username: abc <br>
 Password: abc123 </b>
 
 | Test Case #  | Test Case Description  | Test steps | Expected Result       |
 | :------------|:---------------------- |:---------- |:--------------------- |
 |1 | To check that Navbar Links work | Clicking on Navlinks to ensure redirecting to section works | Redirecting to each page works when each Navlink is clicked |
 |2 | To check that all products listings are loaded | Clicking on 'Products' on Navlink. | Redirected to Products page, displaying all default data that were created in MySQL |
 |3 | To check that search function works | 1. Selecting an option in all 3 fields (Source: Australia, Type: Dailies, Size: Large dog). <br> 2. Selecting an option in Types field while leaving the remaining unselected/unfilled.   | Number of displayed cards reduces - showing only postings that matches filter criteria. Display should be none if there are no postings that matches filter criteria. |
 |4 | Testing of creation of new product | Owner<br> 1. Fill up all fields <br> 2. Leave some fields blank <br> Normal User or anonymous user <br> 1. Tries to click "Add new product" button | Owner <br> 1. Owner are redirected back to 'Products' page, with an alert to inform on the successful submission. The new item appears on the Products page. <br> 2. An error message should appear to alert Owner to fill up all required fields. <br> Normal user or anonymous user <br> 1. An error flash message appears. User is redirected to log in page. |
 |5 | Testing of editing a product posting | Owner<br> 1. Fill up fields that Owner wishes to amend <br> 2. Leave some fields blank <br> Normal User or anonymous user <br> 1. Tries to click "Add new product" button | 1. Owner is redirected back to 'Product' page, with an alert to inform on the successful Edit. <br> 2. An error message should appear to prompt Owner to fill up all required fields. <br> Normal user or anonymous user <br> 1. An error flash message appears. User is redirected to log in page. |
 |6 | Testing of deletion | Owner<br> 1. Confirm button is selected <br> 2. Cancel button is selected <br> Normal User or anonymous user <br> 1. Tries to click "Delete" button  | 1. Owner is redirected back to 'Products' page, with an alert to inform the successful Deletion. The deleted post should disappear. <br> 2. Cancellation of this process will redirect Owner back to the Products page, without any changes. <br> Normal user or anonymous user <br> 1. An error flash message appears. User is redirected to log in page.|
 |7 | Testing of add to cart function | Anonymous user <br> 1. Tries to add to cart <br> Logged in user <br> 1. Click on add to cart button on products page or product details page once. 2. Click on add to cart button more than once. | Anonymous user <br> 1. An error flash message appears. User is redirected to log in page. <br> Logged in user <br> 1. A successful added to cart flash message appears. 2. Within the shopping cart, it shows the related number of quantities corresponding to number of times added to cart. |
 |8 | Testing of update quantity function in shopping cart | Amends quantity and clicks "Update quantity" button. | On page refresh, updated quantity is reflected. |
 |9 | Testing of remove item function in shopping cart | "Remove" button is clicked. | On page refresh, the item disappears from cart. |
 |10| Testing of checkout button in shopping cart | "Checkout" button is clicked. | Redirected to Stripe payment gateway |
 |11| Testing of order creation (for owner only) | Creating an order as a user account. Then logged in to view "orders" tab (in Navbar). | The new order appears|
 |12| Testing of filter of orders (for owner only) | 1. Selected "paid" status in filter option. 2. Selected "February" month in filter option. | 1. Only paid orders are shown. 2. Only orders created in February are shown|
 |13| Update order status (for owner only) | Changed order status to "Shipped" | Order Management page is redirected and refreshed, with change in status registered.|
 |14| Order detail is correct (for owner only) | Added 2 products "testuser" account to cart and checked out. Clicked into "view details" in order management page. | The 2 products are shown under "Items ordered" table. Username is shown. |

# 4. Deployment
  
  <li> The project was built on Gitpod, and monitored via port 3000 after enabling nodemon, before being deployed on Heroku. </li>
  <li> The project was committed, staged, and pushed to GitHub on a usual basis. </li>
  <li> MySQL database was built using using migration technique, via ORM Bookshelf. </li>
  <li> The base Gitpod template I had started out with to build my codes, is from Paul. Link to his Github for the template is credited below in Section 5. </li>
  
  ### Front-end using HBS, HTML/CSS
  All codes can be found within 'views' folder. <br>
  Styling of each feature is done within 'base.hbs', under the styling section. Styling templates from Bootstrap were also relied on. 
  Files not relevant to be published to github, are included in gitignore folder. <br>
  
  ### Back-end using MySQL and Bookshelf ORM
  All codes are done on Gitpod, with MySQL extension. Database tables are created and edited via migration techniques. <br>
  Files not relevant to be published to github, are included in gitignore folder. <br>

# 5. Credits

  ## Content - Dog Food products
  <li> https://www.kohepets.com.sg/ </li>
  
  ## Image
  <li> Logo: https://www.flaticon.com/free-icon/dog-food_3248199 </li>
  <li> Banner: https://corgicare.com/wp-content/uploads/why-do-corgis-eat-so-much.jpg.webp </li>  
  
  ## Technology
  <li> <a href="https://fontawesome.com/v5.15/icons"> FontAwesome </a></li> 
  <li> <a href="https://getbootstrap.com/docs/5.1/getting-started/introduction/">Bootstrap</a></li>
  <li> <a href="https://stripe.com/docs"> Stripe </a></li>
  <li> <a href="https://github.com/caolan/forms"> Caolan Forms </a></li>
  <li> <a href="https://github.com/kunxin-chor/gitpod-full-template"> Built on Paul's gitpod template </a></li>
  
 
