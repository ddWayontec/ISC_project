import get from "lodash/get";
import toNumber from "lodash/toNumber";

import { CREATE_RESULTS_DATA, URLS } from "../../utils/constants";
import { request } from "../../utils/request";
import { statusIsTrue } from "../../utils/status-is-true";

export const submitCreateResults = async ({
  formData,
  email,
  userData,
  setLoading,
  setSuccessSnackbarOpen,
  setErrorSnackbarOpen,
  setTransactionId
}) => {
  console.log(`Form Data: ${JSON.stringify(formData)}`);
  setLoading(true);

  const response = await request(URLS.sendMessage, {
    method: "post",
    data: {
      ...CREATE_RESULTS_DATA,
      Receiver: {
        ID: email,
        MSPID: "Org1MSP"
      },

      Payload: {
        AssesmentInstitution: "ISC",
        AssessmentDate: {
          format: "02-01-2006",
          value: formData.dateOfAssessment
        },
        EdYrs: toNumber(formData.yearsOfEducation),
        FirstName: userData.firstName,
        FullTime: formData.fullTimeEducation,
        LastName: userData.lastName,
        ListeningBM: formData.listeningBenchmark,
        ListeningScore: formData.listeningResult,
        PRNo: userData.prNo,
        ReadingBM: formData.readingBenchmark,
        ReadingScore: formData.readingResult,
        Rec1Inst: formData.schoolRecommendationA,
        Rec1Program: formData.programRecommendationA,
        Rec2Inst: formData.schoolRecommendationB,
        Rec2Program: formData.programRecommendationB,
        SpeakingBM: formData.speakingBenchmark,
        SpeakingScore: formData.speakingResult,
        WritingBM: formData.writingBenchmark,
        WritingScore: formData.writingResult,
        timeAssessed: new Date().toISOString(),
        isValid: true
      }
    }
  });

  console.log(`Creating result ${JSON.stringify(response)}`);

  let transactionId = null;
  if (statusIsTrue(response)) {
    setSuccessSnackbarOpen(true);
    transactionId = get(response, "Extra");
  } else {
    setErrorSnackbarOpen(true);
  }

  setTransactionId(transactionId);
  setLoading(false);
};
