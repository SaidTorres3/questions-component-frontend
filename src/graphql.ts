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
  full_question: Full_Question;
  id: Scalars['Int'];
  posted_answers: Array<Posted_Answer>;
  uuid: Scalars['ID'];
  value: Scalars['JSON'];
};

export type AnswerInterface = {
  en: Scalars['String'];
  es: Scalars['String'];
  value: Scalars['JSON'];
};

export type CreateFullQuestionInput = {
  answersParams: Array<AnswerInterface>;
  imgUrl?: Maybe<Scalars['String']>;
  questionParams: QuestionInterface;
};

export type CreateFullQuestionPayload = {
  __typename?: 'CreateFullQuestionPayload';
  createdUuid: Scalars['ID'];
};

export type CreatePostedAnswerInput = {
  answersUuid?: Maybe<Array<Scalars['ID']>>;
};

export type CreatePostedAnswerPayload = {
  __typename?: 'CreatePostedAnswerPayload';
  response: Scalars['String'];
};

export type Full_Question = {
  __typename?: 'Full_Question';
  answers: Array<Answer>;
  id: Scalars['Int'];
  imgUrl?: Maybe<Scalars['String']>;
  posted_answers: Array<Posted_Answer>;
  question: Question;
  uuid: Scalars['ID'];
};

export type GetFullQuestionsPayload = {
  __typename?: 'GetFullQuestionsPayload';
  questions: Array<Full_Question>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFullQuestion: CreateFullQuestionPayload;
  createPostedAnswers: CreatePostedAnswerPayload;
};


export type MutationCreateFullQuestionArgs = {
  input?: Maybe<CreateFullQuestionInput>;
};


export type MutationCreatePostedAnswersArgs = {
  input?: Maybe<CreatePostedAnswerInput>;
};

export type Posted_Answer = {
  __typename?: 'Posted_Answer';
  answer: Answer;
  full_question: Full_Question;
  id: Scalars['Int'];
  respondent: Respondent;
  uuid: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getFullQuestions: GetFullQuestionsPayload;
};

export type Question = {
  __typename?: 'Question';
  en: Scalars['String'];
  es: Scalars['String'];
  full_question: Full_Question;
  id: Scalars['Int'];
};

export type QuestionInterface = {
  en: Scalars['String'];
  es: Scalars['String'];
};

export type Respondent = {
  __typename?: 'Respondent';
  id: Scalars['Int'];
  posted_answers: Array<Posted_Answer>;
  uuid: Scalars['ID'];
};
