# Show help menu of transcript cli
yarn transcript-cli

# Lookups student in the ODS by demographics

Peter
Pratt
604831
2004-04-13
04/13/2004

yarn transcript-cli query-transcript-by-student-demographics <firstName> <lastName> <dateOfBirth>

# Save the transcript json to a file
yarn transcript-cli query-transcript-by-student-demographics <firstName> <lastName> <dateOfBirth> > filename.json