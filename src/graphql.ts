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
};

export type Answer = {
  __typename?: 'Answer';
  en: Scalars['String'];
  es: Scalars['String'];
  full_question: Full_Question;
  id: Scalars['Int'];
  value: Scalars['String'];
};

export type CreateFullQuestionInput = {
  imgUrl?: Maybe<Scalars['String']>;
};

export type CreateFullQuestionPayload = {
  __typename?: 'CreateFullQuestionPayload';
  createdUuid: Scalars['ID'];
};

export type Full_Question = {
  __typename?: 'Full_Question';
  answers: Array<Answer>;
  id: Scalars['Int'];
  imgUrl?: Maybe<Scalars['String']>;
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
};


export type MutationCreateFullQuestionArgs = {
  input?: Maybe<CreateFullQuestionInput>;
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
