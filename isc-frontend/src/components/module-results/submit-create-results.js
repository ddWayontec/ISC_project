import get from "lodash/get";
import toNumber from "lodash/toNumber";
import trim from "lodash/trim";

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
        FirstName: trim(userData.firstName),
        FullTime: formData.fullTimeEducation,
        LastName: trim(userData.lastName),
        ListeningBM: trim(formData.listeningBenchmark),
        ListeningScore: trim(formData.listeningResult),
        PRNo: trim(userData.prNo),
        ReadingBM: trim(formData.readingBenchmark),
        ReadingScore: trim(formData.readingResult),
        Rec1Inst: trim(formData.schoolRecommendationA),
        Rec1Program: trim(formData.programRecommendationA),
        Rec2Inst: trim(formData.schoolRecommendationB),
        Rec2Program: trim(formData.programRecommendationB),
        SpeakingBM: trim(formData.speakingBenchmark),
        SpeakingScore: trim(formData.speakingResult),
        WritingBM: trim(formData.writingBenchmark),
        WritingScore: trim(formData.writingResult),
        timeAssessed: new Date().toISOString(),
        isValid: true
      }
    }
  });

  let transactionId = null;
  if (statusIsTrue(response)) {
    setSuccessSnackbarOpen(true);
    transactionId = get(response, "Extra");
  } else {
    setErrorSnackbarOpen(true);
    console.error(response);
  }

  setTransactionId(transactionId);
  setLoading(false);
};
