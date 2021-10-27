export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Answer = {
  __typename?: 'Answer';
  uuid: Scalars['ID'];
  question: Question;
  posted_answers: Array<Posted_Answer>;
  value: Scalars['JSON'];
  es: Scalars['String'];
  en: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type CreateAnswerInput = {
  value: Scalars['JSON'];
  es: Scalars['String'];
  en: Scalars['String'];
};

export type CreatePostedAnswerInput = {
  answersUuid?: Maybe<Array<Scalars['ID']>>;
};

export type CreatePostedAnswerPayload = {
  __typename?: 'CreatePostedAnswerPayload';
  respondentUuid: Scalars['ID'];
};

export type CreateQuestionInput = {
  imgUrl?: Maybe<Scalars['String']>;
  es: Scalars['String'];
  en: Scalars['String'];
  answers: Array<CreateAnswerInput>;
};

export type CreateQuestionPayload = {
  __typename?: 'CreateQuestionPayload';
  createdUuid: Scalars['ID'];
};

export type EditAnswerInput = {
  uuid: Scalars['ID'];
  es: Scalars['String'];
  en: Scalars['String'];
};

export type EditQuestionInput = {
  uuid: Scalars['ID'];
  imgUrl?: Maybe<Scalars['String']>;
  es: Scalars['String'];
  en: Scalars['String'];
  answers: Array<EditAnswerInput>;
};

export type EditQuestionPayload = {
  __typename?: 'EditQuestionPayload';
  questionUuid: Scalars['ID'];
};

export type GetQuestionInput = {
  questionUuid: Scalars['ID'];
};

export type GetQuestionPayload = {
  __typename?: 'GetQuestionPayload';
  question: Question;
};

export type GetQuestionsPayload = {
  __typename?: 'GetQuestionsPayload';
  questions: Array<Question>;
};

export type GetStatsPayload = {
  __typename?: 'GetStatsPayload';
  monthlyAverageScore: Scalars['Int'];
  averageScore: Scalars['Int'];
  questionsAmount: Scalars['Int'];
  respondentsAmount: Scalars['Int'];
  selectedAnswersChart: SelectedAnswersChart;
  monthlyAnswersChart: MonthlyAnswersChart;
};

export type MonthlyAnswersChart = {
  __typename?: 'MonthlyAnswersChart';
  monthlyCount: Array<Scalars['Int']>;
  hightestCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuestion: CreateQuestionPayload;
  createPostedAnswers: CreatePostedAnswerPayload;
  editQuestion: EditQuestionPayload;
};


export type MutationCreateQuestionArgs = {
  input?: Maybe<CreateQuestionInput>;
};


export type MutationCreatePostedAnswersArgs = {
  input?: Maybe<CreatePostedAnswerInput>;
};


export type MutationEditQuestionArgs = {
  input?: Maybe<EditQuestionInput>;
};

export type Posted_Answer = {
  __typename?: 'Posted_Answer';
  uuid: Scalars['ID'];
  question: Question;
  answer: Answer;
  respondent: Respondent;
  createdAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getQuestion: GetQuestionPayload;
  getQuestions: GetQuestionsPayload;
  getStats: GetStatsPayload;
};


export type QueryGetQuestionArgs = {
  input: GetQuestionInput;
};

export type Question = {
  __typename?: 'Question';
  uuid: Scalars['ID'];
  imgUrl?: Maybe<Scalars['String']>;
  es: Scalars['String'];
  en: Scalars['String'];
  answers: Array<Answer>;
  posted_answers: Array<Posted_Answer>;
  createdAt: Scalars['DateTime'];
};

export type Respondent = {
  __typename?: 'Respondent';
  uuid: Scalars['ID'];
  posted_answers: Array<Posted_Answer>;
  createdAt: Scalars['DateTime'];
};

export type SelectedAnswersChart = {
  __typename?: 'SelectedAnswersChart';
  labels: Array<Scalars['String']>;
  count: Array<Scalars['Int']>;
  hightestCount: Scalars['Int'];
};
