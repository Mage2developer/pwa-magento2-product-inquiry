<h2><b>Product Inquiry Add-on for Magento 2 PWA Studio</b></h2>

<p><b>Product Inquiry Add-on</b> is a very useful feature for customers. Customers can ask their queries for a specific product by submitting an inquiry form on product page in Magento 2 PWA Storefront. The customer and administrator both would get an email regading the same. Customers can view admin approved inquiries on product page. To make this add-on work, you should install the <a href="https://github.com/Mage2developer/magento2-product-inquiry-graphql" target="_blank">Mage2 Product Inquiry GraphQL extension</a> on your Magento 2 instance.</p>

<h3><b>Pre-requirements</b></h3>
<ul>
<li>Magento 2.3.* or 2.4.*</li>
<li><a href="https://github.com/Mage2developer/magento2-product-inquiry-graphql" target="_blank">Mage2 Product Inquiry GraphQL</a> should be installed in Magento 2 instance</li>
</ul>

<h3><b>Installation Instruction</b></h3>
<ol>
<li>Copy <b>@mage2</b> directory files and folders inside the <b>src</b> directory, for example:<br/> <pre>{pwa-root-dir}/packages/{custom-package}/@mage2</pre></li>
<li>Add the Product Inquiry add-on dependency in the <b>package.json</b> file of your custom package or venia-concept package:<br/>
<b>File Path:</b> {pwa-root-dir}/packages/{custom-package}/package.json
<pre>
"dependencies": {
    ...
    "@mage2": "link:src/@mage2",
    "product-inquiry": "link:src/@mage2/product-inquiry"
},
</pre>
</li>
<li>Run the following command inside your custom package or venia-concept directory:
<pre>yarn install</pre>
</li>
<li><b>ProductFullDetail React component</b> is responsible to handle product page layout in Magento 2 PWA Storefront. To add Product Inquiry add-on on product page, you need to add following code inside the <b>local-intercept.js</b> file of your custom package or venia-concept package:<br/>
<b>File Path:</b> {pwa-root-dir}/packages/{custom-package}/src/targets/local-intercept.js
<pre>
const ProductDetails = targetables.reactComponent(
    '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
);

const ProductInquiry = ProductDetails.addImport(
    "ProductInquiry from '@mage2/product-inquiry'"
);

ProductDetails.insertAfterJSX('`<Form />`', \`<${ProductInquiry} productSku={productDetails.sku} />\`);
</pre>
</li>
<li>Run the PWA storefront using following command:<br/>
<pre>yarn {custom-package} run build && yarn {custom-package} run watch</pre>
<b>Note:</b> Replace {custom-package} with your custom package name or venia package i.e.
<pre>yarn example-concept run build && yarn example-concept run watch</pre> or
<pre>yarn venia run build && yarn venia run watch</pre>
</li>
</ol>

<h3><b>Features</b></h3>
<ul>
<li>Easy to install and manage</li>
<li>Both registered & unregistered customers can send the inquiry</li>
<li>Both admin and customer will be notified via email once the inquiry is submitted</li>
<li>Customers can view display in front marked inquiries on product page</li>
</ul>

<p>In case of any other queries regarding this add-on:<br />
Contact us at <b>mage2developer@gmail.com</b>. We would be really happy to help :)</p>

<h3><b>Screen Shot</b></h3>

<p><b><i>Product Inquiry add-on on product page in Magento 2 PWA Storefront</i></b></p>
<img src="https://user-images.githubusercontent.com/26230770/141300644-156daac2-a14c-4400-8130-a002098f0f15.png" alt="product-inquiry-add-on-product-page-pwa-storefront" />

<p><b><i>Product Inquiry Form opened by clicking "Product Inquiry" button</i></b></p>
<img src="https://user-images.githubusercontent.com/26230770/141300660-13524de8-d321-47df-a9b0-c1653c69e5ec.png" alt="product-inquiry-form-on-product-page-pwa-storefront" />

<p><b><i>Thank you message after submitting Product Inquiry form</i></b></p>
<img src="https://user-images.githubusercontent.com/26230770/141300672-1a931ed5-9989-4ba3-acb6-7f2529792669.png" alt="thank-you-msg-on-product-page-pwa-storefront" />

<p><b><i>View Product Inquiries</i></b></p>
<img src="https://user-images.githubusercontent.com/26230770/141300682-a1056e81-501d-41ee-ab11-6b2e3887e6e4.png" alt="view-inquiry-on-product-page-pwa-storefront" />

