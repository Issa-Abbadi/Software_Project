import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Avatar, Input } from "@mui/material";
import axios from "axios";
import Title from "./Title";
import { DataGrid, renderCell, GridColDef } from "@mui/x-data-grid";

import { optionGroupUnstyledClasses } from "@mui/base";
import { Link } from "react-router-dom";
import { spacing } from "@mui/system";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [ID, setID] = useState([]);
  const [discount, setDiscount] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:4000/Products/company", {
        product_company: localStorage.getItem("UserName"),
      })
      .then(({ data }) => {
        setProducts(data);
        //console.log("h", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const rows = products.map((product) => ({
    id: product._id,
    الاسم: product.product_name,
    الفئة: product.product_category,
    الصنف: product.sub_category,
    التقييم: product.product_rating,
    الوصف: product.product_description,
    السعر: product.vars[0].price + "$",
    الصورة: product.vars[0].product_img,
    vars: product.vars,
  }));

  const columns = [
    { field: "الاسم", headerName: "الاسم", width: 150 },
    {
      field: "الصورة",
      headerName: "الصورة",
      width: 50,
      renderCell: (params) => {
        //console.log(params);
        return (
          <>
            <Avatar
              src={params.value}
              style={{ transform: "rotateY(180deg)" }}
            />
            {params.value.username}
          </>
        );
      },
    },
    {
      field: "الفئة",
      headerName: "الفئة",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "الصنف",
      headerName: "الصنف",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "التقييم",
      headerName: "التقييم",
      width: 50,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "السعر",
      headerName: "السعر",

      width: 60,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "تعديل",
      headerName: "تعديل",
      width: 50,
      renderCell: () => (
        <span style={{ transform: "rotateY(180deg)" }}>
          <Link to="/admin" state={{ Name: "تعديل منتج" }}>
            تعديل
          </Link>
        </span>
      ),
    },
    {
      field: "1 نوع",
      headerName: "1 نوع",
      width: 100,
      renderCell: (params) => (
        <>
          {params.row.vars[0] === null ? (
            <span style={{ transform: "rotateY(180deg)" }}>
              <Link to="/admin" state={{ Name: "إضافة نوع" }}>
                إضافة نوع
              </Link>
            </span>
          ) : (
            <span style={{ transform: "rotateY(180deg)" }}>
              <Link to="/admin" state={{ Name: "تعديل نوع", Value: "0" }}>
                تعديل نوع
              </Link>
            </span>
          )}
        </>
      ),
    },
    {
      field: "2 نوع",
      headerName: "2 نوع",
      width: 100,
      renderCell: (params) => (
        <>
          {params.row.vars[1] === null ? (
            <span style={{ transform: "rotateY(180deg)" }}>
              <Link to="/admin" state={{ Name: "إضافة نوع" }}>
                إضافة نوع
              </Link>
            </span>
          ) : (
            <span style={{ transform: "rotateY(180deg)" }}>
              <Link to="/admin" state={{ Name: "تعديل نوع", Value: "1" }}>
                تعديل نوع
              </Link>
            </span>
          )}
        </>
      ),
    },
    {
      field: "3 نوع",
      headerName: "3 نوع",
      width: 100,
      renderCell: (params) => (
        <>
          {params.row.vars[2] === null ? (
            <span style={{ transform: "rotateY(180deg)" }}>
              <Link to="/admin" state={{ Name: "إضافة نوع" }}>
                إضافة نوع
              </Link>
            </span>
          ) : (
            <span style={{ transform: "rotateY(180deg)" }}>
              <Link to="/admin" state={{ Name: "تعديل نوع", Value: "2" }}>
                تعديل نوع
              </Link>
            </span>
          )}
        </>
      ),
    },
    {
      field: "الوصف",
      headerName: "الوصف",

      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];

  const handleDiscount = () => {
    axios
      .post("http://localhost:4000/Products/discount", {
        ID: ID,
        product_company: localStorage.getItem("UserName"),
        discount: discount,
      })
      .then(({ data }) => {
        //setProducts(data);
        //console.log("h", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    if (event.target.value >= 0 && event.target.value <= 100)
      setDiscount(event.target.value);
  };

  return (
    <React.Fragment>
      <Title>منتجاتك</Title>
      <div style={{ height: "400px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            console.log(newSelectionModel);
            setID(newSelectionModel);
            localStorage.setItem("EditProduct", newSelectionModel);
            console.log(ID);
          }}
          localeText={{
            // Root
            noRowsLabel: "",
            noResultsOverlayLabel: "",
            errorOverlayDefaultLabel: "",
            // Column menu text
            columnMenuLabel: "القائمة",
            columnMenuShowColumns: "أظهر الأعمدة",
            columnMenuFilter: "تصنيف",
            columnMenuHideColumn: "اخفي",
            columnMenuUnsort: "بدون ترتيب",
            columnMenuSortAsc: "ترتيب تصاعدي",
            columnMenuSortDesc: "ترتيب تنازلي",

            // Columns panel text
            columnsPanelTextFieldLabel: "أبحث عن عمود",
            columnsPanelTextFieldPlaceholder: "اسم العمود",
            columnsPanelDragIconLabel: "أعد ترتيب الأعمدة",
            columnsPanelShowAllButton: "أظهر الكل",
            columnsPanelHideAllButton: "اخفي الكل",

            // Filter panel text
            filterPanelAddFilter: " إضافة تصنيف",
            filterPanelDeleteIconLabel: "حذف",
            filterPanelLinkOperator: "Logic operator",
            filterPanelOperators: "عامل", // TODO v6: rename to filterPanelOperator
            filterPanelOperatorAnd: "و",
            filterPanelOperatorOr: "أو",
            filterPanelColumns: "الأعمدة",
            filterPanelInputLabel: "القيمة",
            filterPanelInputPlaceholder: "قيمة التصنيف",

            // Filter operators text
            filterOperatorContains: "يحتوي",
            filterOperatorEquals: "يساوي",
            filterOperatorStartsWith: "يبدأ ب ",
            filterOperatorEndsWith: "ينتهي ب ",
            filterOperatorIsEmpty: "فارغ",
            filterOperatorIsNotEmpty: "ليس فارغاً  ",
            filterOperatorIsAnyOf: "هو أي من",

            // Filter values text
            filterValueAny: "أي",
            filterValueTrue: "صح",
            filterValueFalse: "خطأ",

            // Column header text
            columnHeaderFiltersTooltipActive: (count) =>
              count !== 1
                ? `${count} active filters`
                : `${count} active filter`,
            columnHeaderFiltersLabel: "Show filters",
            columnHeaderSortIconLabel: "Sort",
          }}
        />
        <Link to="/admin" state={{ Name: "أضف منتج" }}>
          إضافة منتج
        </Link>
        <form onSubmit={handleDiscount}>
          <Input
            required
            type="number"
            id="product_discount"
            name="product_discount"
            label="نسبة الخصم"
            inputProps={{ min: 0, max: 100, step: 1 }}
            style={{ width: "200px", margin: "20px" }}
            placeholder="نسبة الخصم"
            value={discount}
            onChange={(event) => {
              handleChange(event);
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3, ml: 1 }}
            class="nextButton"
          >
            تحديد نسبة الخصم
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
}
