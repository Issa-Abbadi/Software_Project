import React from "react";

function AddProduct(props) {
  return (
    <>
      <form>
        <div class="form-floating mb-3" style={{ margin: "5%" }}>
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
