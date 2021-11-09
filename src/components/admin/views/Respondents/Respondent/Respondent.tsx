import { useParams } from "react-router";
import Card from "src/components/admin/components/Card/Card";
import { URLParams } from "src/routes";
import { GetRespondentQuery, useGetRespondentQuery } from "./operations.gql";
import { createStyles } from '@material-ui/core';
import { withStyles } from "@material-ui/styles";

export const Respondent = (props: Props) => {
  const { classes } = props;

  const { encuestado } = useParams<URLParams>()
  const { data, loading, error } = useGetRespondentQuery({
    variables: {
      input: {
        respondentUuid: encuestado
      }
    }
  });

  const mapPostedAnswers = () => {
    return data?.getRespondent.respondent.posted_answers.map((posted_answer, index) => {
      const question = posted_answer.question.es
      const answer = posted_answer.answer.es
      return <Card>
        <div className={classes.card__inside}>
          <div className={classes.card__inside__title}>
            {index + 1} .- {question}
          </div>
          <p>{answer}</p>
        </div>
      </Card>
    });
  }

  return (
    <div>
      <h3 className={classes.title}>
        Encuestado {data?.getRespondent.respondent.id} ➡ Calificación promedio: {data?.getRespondent.respondent.avgScore}
      </h3>
      {mapPostedAnswers()}
    </div>
  );
};

const styles = createStyles({
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  card__inside: {
    padding: '10px 20px'
  },
  card__inside__title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row'
  }
});

export default withStyles(styles)(Respondent);

interface Props {
  classes: any;
}