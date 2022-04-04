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
  answersUuid: Array<Scalars['ID']>;
  userUuid: Scalars['ID'];
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

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  type: Scalars['String'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  createdUuid: Scalars['ID'];
};

export type DeleteQuestionInput = {
  questionUuid: Scalars['ID'];
};

export type DeleteQuestionPayload = {
  __typename?: 'DeleteQuestionPayload';
  deletedUuid: Scalars['ID'];
};

export type DeleteRespondentInput = {
  respondentUuid: Scalars['ID'];
};

export type DeleteRespondentPayload = {
  __typename?: 'DeleteRespondentPayload';
  deletedUuid: Scalars['ID'];
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

export type GetQuestionStatsInput = {
  questionUuid: Scalars['ID'];
};

export type GetQuestionStatsPayload = {
  __typename?: 'GetQuestionStatsPayload';
  selectedAnswersChart: GetQuestionStatsSelectedAnswersChart;
};

export type GetQuestionStatsSelectedAnswersChart = {
  __typename?: 'GetQuestionStatsSelectedAnswersChart';
  labels: Array<Scalars['String']>;
  count: Array<Scalars['Int']>;
  hightestCount: Scalars['Int'];
  allNumericValues: Scalars['Boolean'];
};

export type GetQuestionsFilterInput = {
  nameSearch?: Maybe<Scalars['String']>;
};

export type GetQuestionsPayload = {
  __typename?: 'GetQuestionsPayload';
  items: Array<Question>;
  total: Scalars['Int'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export enum GetQuestionsSortBy {
  CreatedAt = 'createdAt'
}

export type GetQuestionsSortInput = {
  by: GetQuestionsSortBy;
  direction?: Maybe<SortDirection>;
  nulls?: Maybe<SortNulls>;
};

export type GetRespondentInput = {
  respondentUuid: Scalars['ID'];
};

export type GetRespondentPayload = {
  __typename?: 'GetRespondentPayload';
  respondent: Respondent;
};

export type GetRespondentsFilterInput = {
  nameSearch?: Maybe<Scalars['String']>;
};

export type GetRespondentsPayload = {
  __typename?: 'GetRespondentsPayload';
  items: Array<Respondent>;
  total: Scalars['Int'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export enum GetRespondentsSortBy {
  CreatedAt = 'createdAt',
  Id = 'id'
}

export type GetRespondentsSortInput = {
  by: GetRespondentsSortBy;
  direction?: Maybe<SortDirection>;
  nulls?: Maybe<SortNulls>;
};

export type GetStatsPayload = {
  __typename?: 'GetStatsPayload';
  monthlyAverageScore: Scalars['Int'];
  averageScore: Scalars['Int'];
  respondentsAmount: Scalars['Int'];
  monthlyRespondentsAmount: Scalars['Int'];
  questionsAmount: Scalars['Int'];
  selectedAnswersChart: SelectedAnswersChart;
  monthlyAnswersChart: MonthlyAnswersChart;
};

export type GetUserInput = {
  userUuid: Scalars['ID'];
};

export type GetUserPayload = {
  __typename?: 'GetUserPayload';
  user: User;
};

export type GetUsersFilterInput = {
  nameSearch?: Maybe<Scalars['String']>;
};

export type GetUsersPayload = {
  __typename?: 'GetUsersPayload';
  items: Array<User>;
  total: Scalars['Int'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export enum GetUsersSortBy {
  CreatedAt = 'createdAt',
  Id = 'id'
}

export type GetUsersSortInput = {
  by: GetUsersSortBy;
  direction?: Maybe<SortDirection>;
  nulls?: Maybe<SortNulls>;
};

export type LoginUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserPayload = LoginUserPayloadSuccess | LoginUserPayloadFail;

export type LoginUserPayloadFail = {
  __typename?: 'LoginUserPayloadFail';
  message: Scalars['String'];
};

export type LoginUserPayloadSuccess = {
  __typename?: 'LoginUserPayloadSuccess';
  token: Scalars['ID'];
  user: User;
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
  deleteQuestion: DeleteQuestionPayload;
  createUser: CreateUserPayload;
  loginUser?: Maybe<LoginUserPayload>;
  validadeToken?: Maybe<ValidadeTokenPayload>;
  deleteRespondent: DeleteRespondentPayload;
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


export type MutationDeleteQuestionArgs = {
  input: DeleteQuestionInput;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationLoginUserArgs = {
  input?: Maybe<LoginUserInput>;
};


export type MutationValidadeTokenArgs = {
  input?: Maybe<ValidadeTokenInput>;
};


export type MutationDeleteRespondentArgs = {
  input: DeleteRespondentInput;
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
  getQuestionStats: GetQuestionStatsPayload;
  getRespondent: GetRespondentPayload;
  getRespondents: GetRespondentsPayload;
  getStats: GetStatsPayload;
  getUser: GetUserPayload;
  getUsers: GetUsersPayload;
};


export type QueryGetQuestionArgs = {
  input: GetQuestionInput;
};


export type QueryGetQuestionsArgs = {
  sort?: Maybe<GetQuestionsSortInput>;
  filter?: Maybe<GetQuestionsFilterInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryGetQuestionStatsArgs = {
  input: GetQuestionStatsInput;
};


export type QueryGetRespondentArgs = {
  input: GetRespondentInput;
};


export type QueryGetRespondentsArgs = {
  sort?: Maybe<GetRespondentsSortInput>;
  filter?: Maybe<GetRespondentsFilterInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryGetUserArgs = {
  input: GetUserInput;
};


export type QueryGetUsersArgs = {
  sort?: Maybe<GetUsersSortInput>;
  filter?: Maybe<GetUsersFilterInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
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
  id: Scalars['ID'];
  uuid: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  avgScore: Scalars['Float'];
  posted_answers: Array<Posted_Answer>;
  user: User;
};

export type SelectedAnswersChart = {
  __typename?: 'SelectedAnswersChart';
  labels: Array<Scalars['String']>;
  count: Array<Scalars['Int']>;
  hightestCount: Scalars['Int'];
};

export enum SortDirection {
  Asc = 'Asc',
  Desc = 'Desc'
}

export enum SortNulls {
  First = 'First',
  Last = 'Last'
}

export type User = {
  __typename?: 'User';
  uuid: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  username: Scalars['String'];
  password: Scalars['String'];
  type: Scalars['String'];
  respondents?: Maybe<Array<Respondent>>;
};

export type ValidadeTokenInput = {
  token: Scalars['String'];
};

export type ValidadeTokenPayload = ValidadeTokenPayloadSuccess | ValidadeTokenPayloadFail;

export type ValidadeTokenPayloadFail = {
  __typename?: 'ValidadeTokenPayloadFail';
  message: Scalars['String'];
};

export type ValidadeTokenPayloadSuccess = {
  __typename?: 'ValidadeTokenPayloadSuccess';
  user: User;
};
