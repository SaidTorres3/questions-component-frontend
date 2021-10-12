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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Answer = {
  __typename?: 'Answer';
  en: Scalars['String'];
  es: Scalars['String'];
  posted_answers: Array<Posted_Answer>;
  question: Question;
  uuid: Scalars['ID'];
  value: Scalars['JSON'];
};

export type AnswerInterface = {
  en: Scalars['String'];
  es: Scalars['String'];
  value: Scalars['JSON'];
};

export type CreatePostedAnswerInput = {
  answersUuid?: Maybe<Array<Scalars['ID']>>;
};

export type CreatePostedAnswerPayload = {
  __typename?: 'CreatePostedAnswerPayload';
  response: Scalars['String'];
};

export type CreateQuestionInput = {
  answersParams: Array<AnswerInterface>;
  en: Scalars['String'];
  es: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
};

export type CreateQuestionPayload = {
  __typename?: 'CreateQuestionPayload';
  createdUuid: Scalars['ID'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createPostedAnswers: CreatePostedAnswerPayload;
  createQuestion: CreateQuestionPayload;
};


export type MutationCreatePostedAnswersArgs = {
  input?: Maybe<CreatePostedAnswerInput>;
};


export type MutationCreateQuestionArgs = {
  input?: Maybe<CreateQuestionInput>;
};

export type Posted_Answer = {
  __typename?: 'Posted_Answer';
  answer: Answer;
  question: Question;
  respondent: Respondent;
  uuid: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getQuestion: GetQuestionPayload;
  getQuestions: GetQuestionsPayload;
};


export type QueryGetQuestionArgs = {
  input: GetQuestionInput;
};

export type Question = {
  __typename?: 'Question';
  answers: Array<Answer>;
  en: Scalars['String'];
  es: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  posted_answers: Array<Posted_Answer>;
  uuid: Scalars['ID'];
};

export type Respondent = {
  __typename?: 'Respondent';
  posted_answers: Array<Posted_Answer>;
  uuid: Scalars['ID'];
};
