import React from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdown = ({ state }) => {
  // render
  return (
    <CRow>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-primary"
          header={
            state
              ? state.TotalRegisterUser && `${state.TotalRegisterUser.length}`
              : "0"
          }
          text="Total Registered user"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header={
            state
              ? state.userRegisterToday && `${state.userRegisterToday.length}`
              : "0"
          }
          text="Users Registered today"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-warning"
          header="9.823"
          text="Reviewer request received today"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header={
            state ? state.TotalChalange && `${state.TotalChalange.length}` : "0"
          }
          text="Total number of challenges"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header={
            state
              ? state.TotalRegisterUser &&
                `${
                  state.TotalRegisterUser.filter(
                    (data) => data.isReviewer === true
                  ).length
                }`
              : "0"
          }
          text="Total number of Reviewers"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header={
            state ? state.TotalCategory && `${state.TotalCategory.length}` : "0"
          }
          text="Total number of Categories"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header={
            state
              ? state.TotalChalange &&
                `${
                  state.TotalChalange.filter((data) => data.active === true)
                    .length
                }`
              : "0"
          }
          text="Active Challenges"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Most active user / Top 5 active users"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Trending challenge - Challenge with most number of submissions"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Total amount received from review request
          "
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Amount Received today from review request

          "
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Users (challengers) requesting reviewers          "
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
