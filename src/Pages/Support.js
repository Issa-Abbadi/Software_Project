import React from "react";
import './wishList.css';
function Support(props) {
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
     <p style={{"marginBottom":"2px","fontSize":"20px",}}>اتصل بنا من هنا</p>
     <p style={{"marginTop":"2px","marginBottom":"2px","fontSize":"20px",}}>service@Houseware.com</p>
     <p  style={{"marginTop":"2px","fontSize":"20px",}}>متاحون لخدمتكم على مدار 24 ساعة</p>


    </div>
  );
}

export default Support;
