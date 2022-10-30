import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Title from "./Title";
import { DataGrid } from "@mui/x-data-grid";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [products, setProducts] = useState([]);
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
  }));

  const columns = [
    { field: "الاسم", headerName: "الاسم", width: 150 },
    { field: "الفئة", headerName: "الفئة", width: 150 },
    { field: "الصنف", headerName: "الصنف", width: 150 },
    { field: "التقييم", headerName: "التقييم", width: 150 },
    { field: "الوصف", headerName: "الوصف", width: 150 },
    { field: "السعر", headerName: "السعر", width: 150 },
  ];

  return (
    <React.Fragment>
      <Title>منتجاتك</Title>
      <div style={{ height: "400px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
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
