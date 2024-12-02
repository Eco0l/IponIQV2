import { Datagrid, List, TextField, ReferenceField, NumberField, TopToolbar, CreateButton } from "react-admin";
import CsvImporter from "./CsvImporter";  // Import CsvImporter component

const LessonListActions = () => (
  <TopToolbar>
    <CreateButton />
    <CsvImporter />  {/* Add the CsvImporter button here */}
  </TopToolbar>
);

export const LessonList = () => {
  return (
    <List actions={<LessonListActions />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="unitId" reference="units" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};