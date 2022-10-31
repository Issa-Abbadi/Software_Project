import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import axios from "axios";
import Title from "./Title";
import { DataGrid, renderCell } from "@mui/x-data-grid";

import { optionGroupUnstyledClasses } from "@mui/base";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    axios
      .post("http://localhost:4000/Products/company", {
        product_company: localStorage.getItem("UserName"),
      })
      .then(({ data }) => {
        setProducts(data);
        console.log("h", data);
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
    السعر: product.product_price + "$",
    الصورة: product.product_img,
  }));

  const columns = [
    { field: "الاسم", headerName: "الاسم", flex: 2 },
    {
      field: "الصورة",
      headerName: "الصورة",
      flex: 1,
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            <Avatar src={params.value} />
            {params.value.username}
          </>
        );
      },
    },
    {
      field: "الفئة",
      headerName: "الفئة",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "الصنف",
      headerName: "الصنف",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "التقييم",
      headerName: "التقييم",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "الوصف",
      headerName: "الوصف",

      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "السعر",
      headerName: "السعر",

      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "تعديل",
      headerName: "تعديل",
      width: 150,
      renderCell: () => (
        <Link to="/admin" state={{ Name: "تعديل منتج" }}>
          تعديل
        </Link>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Title>منتجاتك</Title>
      <div style={{ height: "400px", width: "100%" }}>
        <DataGrid
          style={{ overflow: "scroll" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(newSelectionModel) => {
            console.log(newSelectionModel);
            setID(newSelectionModel);
            localStorage.setItem("EditProduct", newSelectionModel);
            console.log(ID);
          }}
          disableMultipleSelection={true}
          localeText={{
            // Root
            noRowsLabel: "لا يوجد سطور",
            noResultsOverlayLabel: "لايوجد نتائج",
            errorOverlayDefaultLabel: "حصل خلل ما",
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
      </div>
    </React.Fragment>
  );
}
