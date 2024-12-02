import { Datagrid, List, TextField, ReferenceField, NumberField, BooleanField, TopToolbar, CreateButton } from "react-admin";
import ChallengeOptionCsvImporter from "./ChallengeOptionCsvImporter";  // Import the ChallengeOption CsvImporter component

// Custom action bar with create and CSV import buttons
const ChallengeOptionListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ChallengeOptionCsvImporter />  {/* Add the ChallengeOption CsvImporter here */}
  </TopToolbar>
);

export const ChallengeOptionList = () => {
  return (
    <List actions={<ChallengeOptionListActions />}>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <ReferenceField source="challengeId" reference="challenges">
          <TextField source="question" /> {/* Reference field for the challenge's question */}
        </ReferenceField>
        <TextField source="imageSrc" />
      </Datagrid>
    </List>
  );
};
