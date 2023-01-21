import React from "react";

function ConditionsOfUse(props) {
  return (
    <div style={{"direction":"rtl","marginTop":"5%","backgroundColor":"white","padding":"1%",}}>
    <h1>تواصل معنا</h1>
    <p class="paraSupport">تواصل معنا عبر الطرق الاتيه او استخدم الايميل الخاص بنا</p>
    <em class="customerService">خدمات المشتركين</em>
    <hr style={{"color":"black","marginTop":"0px",}} />
   <a  href="tel:0597495186" class="makeCall" >اتصل بنا من هنا</a>
   <a href="mailto:service@Houseware.com" class="emailUs" >service@Houseware.com</a>
   <p  style={{"marginTop":"2px","fontSize":"20px",}}>متاحون لخدمتكم على مدار 24 ساعة</p>

   <em class="customerService">استفسارات المنتج </em>
    <hr style={{"color":"black","marginTop":"0px",}} />
   <p style={{"marginBottom":"2px","fontSize":"20px","fontWeight":"bold",}}>معلومات المنتج والتجميع وأوامر قطع الغيار</p>
   <a  href="tel:0597495186" class="makeCall" >اتصل بنا من هنا</a>
   <a href="mailto:service@Houseware.com" class="emailUs" >PS@Houseware.com</a>
   <p style={{"marginBottom":"2px","marginTop":"25px","fontSize":"20px","fontWeight":"bold",}}>عمليات تقديم منتج جديد</p>
   <a href="mailto:service@Houseware.com" class="emailUs" >newvendorinquiries@Houseware.com</a>
   <p style={{"marginBottom":"2px","marginTop":"25px","fontSize":"20px","fontWeight":"bold",}}> برامج الحوافز وخصومات الحجم</p>
   <a  href="tel:0597495186" class="makeCall" >اتصل بنا من هنا</a>
   <a href="mailto:service@Houseware.com" class="emailUs" >tradesales@Houseware.com</a>
  </div>
  );
}

export default ConditionsOfUse;
