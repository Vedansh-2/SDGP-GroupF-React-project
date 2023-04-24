import { Breadcrumbs,Table,Button } from "govuk-react";
function ViewAppointment(){
return(
    <div>
        <Breadcrumbs>
  <Breadcrumbs.Link href="/HomePage">
  HomePage
  </Breadcrumbs.Link>
  View/Cancel Appointment
</Breadcrumbs>
<Table
  caption="Attention, I am the caption of this ship!"
  head={<Table.Row><Table.CellHeader>Month you apply</Table.CellHeader><Table.CellHeader numeric>Rate for vehicles</Table.CellHeader><Table.CellHeader numeric>Rate for bicycles</Table.CellHeader><Table.CellHeader>Rate for bicycles</Table.CellHeader></Table.Row>}
>
  <Table.Row>
    <Table.CellHeader>
      January
    </Table.CellHeader>
    <Table.Cell numeric>
      £165.00
    </Table.Cell>
    <Table.Cell numeric>
      £85.00
    </Table.Cell>
    <Table.CellHeader>
<Button
>
  Cancel Appointment
</Button>
    </Table.CellHeader>
  </Table.Row>
  <Table.Row>
    <Table.CellHeader>
      February
    </Table.CellHeader>
    <Table.Cell numeric>
      £165.00
    </Table.Cell>
    <Table.Cell numeric>
      £85.00
    </Table.Cell>
    <Table.CellHeader>
<Button
>
  Cancel Appointment
</Button>
    </Table.CellHeader>
  </Table.Row>
  <Table.Row>
    <Table.CellHeader>
      March
    </Table.CellHeader>
    <Table.Cell numeric>
      £151.00
    </Table.Cell>
    <Table.Cell numeric>
      £77.00
    </Table.Cell>
<Table.CellHeader>
<Button
>
  Cancel Appointment
</Button>
    </Table.CellHeader>
  </Table.Row>
  <Table.Row>
    <Table.CellHeader>
      April
    </Table.CellHeader>
    <Table.Cell numeric>
      £136.00
    </Table.Cell>
    <Table.Cell numeric>
      £70.00
    </Table.Cell>
    <Table.CellHeader>
<Button
>
  Cancel Appointment
</Button>
    </Table.CellHeader>
  </Table.Row>
</Table>
        
    </div>
)
}
export default ViewAppointment;