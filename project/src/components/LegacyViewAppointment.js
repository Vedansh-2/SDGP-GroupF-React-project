import { Breadcrumbs, Table, Button } from "govuk-react";
import "./componentStyle.css";

function ViewAppointment() {
  return (
    <main
      className="govuk-main-wrapper app-main-class"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-xl">Create Appointment</h1>
      <div>
        <Table
          head={
            <Table.Row>
              <Table.CellHeader>Name</Table.CellHeader>
              <Table.CellHeader numeric>Date</Table.CellHeader>
              <Table.CellHeader numeric>Start Time</Table.CellHeader>
              <Table.CellHeader>Change:</Table.CellHeader>
            </Table.Row>
          }
        >
          <Table.Row>
            <Table.CellHeader>January</Table.CellHeader>
            <Table.Cell numeric>£165.00</Table.Cell>
            <Table.Cell numeric>£85.00</Table.Cell>
            <Table.CellHeader>
              <Button className="govuk-button" data-module="govuk-button">
                Cancel Appointment
              </Button>
            </Table.CellHeader>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>February</Table.CellHeader>
            <Table.Cell numeric>£165.00</Table.Cell>
            <Table.Cell numeric>£85.00</Table.Cell>
            <Table.CellHeader>
              <Button className="govuk-button" data-module="govuk-button">
                Cancel Appointment
              </Button>
            </Table.CellHeader>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>March</Table.CellHeader>
            <Table.Cell numeric>£151.00</Table.Cell>
            <Table.Cell numeric>£77.00</Table.Cell>
            <Table.CellHeader>
              <Button className="govuk-button" data-module="govuk-button">
                Cancel Appointment
              </Button>
            </Table.CellHeader>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>April</Table.CellHeader>
            <Table.Cell numeric>£136.00</Table.Cell>
            <Table.Cell numeric>£70.00</Table.Cell>
            <Table.CellHeader>
              <Button className="govuk-button" data-module="govuk-button">
                Cancel Appointment
              </Button>
            </Table.CellHeader>
          </Table.Row>
        </Table>
      </div>
    </main>
  );
}
export default ViewAppointment;
