import { Datagrid, List, TextField, ReferenceField, NumberField, SelectField, TopToolbar, CreateButton } from "react-admin";
import ChallengeCsvImporter from "./CsvImporter";  // Import the CSV Importer component

const ChallengeListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ChallengeCsvImporter />  {/* Add the Challenge CsvImporter here */}
  </TopToolbar>
);

export const ChallengeList = () => {
  return (
    <List actions={<ChallengeListActions />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="question" />
        <SelectField
          source="type"
          choices={[
            { id: "SELECT", name: "SELECT" },
            { id: "ASSIST", name: "ASSIST" }
          ]}
        />
        <ReferenceField source="lessonId" reference="lessons">
          <TextField source="title" /> {/* Reference field for the lesson's title */}
        </ReferenceField>
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};
