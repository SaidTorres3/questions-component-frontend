import React, { useEffect, useState } from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import { createStyles } from '@material-ui/core';
import Button from '../../components/CustomButtons/Button';
import { Link } from 'react-router-dom';
import { useGetRespondentsQuery } from './operations.gql';
import { GetRespondentsSortBy, SortDirection } from 'src/graphql';

function Respondents(props: any) {
  const { classes } = props;
  const takeAmount = 8;
  const [pagination, setPagination] = useState({
    page: 1,
    take: takeAmount,
    skip: 0,
    hasMore: true
  })

  const { data } = useGetRespondentsQuery({
    variables: {
      sort: {
        direction: SortDirection.Desc,
        by: GetRespondentsSortBy.CreatedAt,
      },
      take: pagination.take,
      skip: pagination.skip
    }
  })

  useEffect(() => {
    if (data)
      setPagination(prev => {
        let { page, take, skip, hasMore } = prev;
        hasMore = data.getRespondents.hasMore;
        return {
          page, take, skip, hasMore
        }
      })
  }, [data])

  const nextHandler = () => {
    if (!pagination.hasMore) return;
    setPagination(prev => {
      let { page, take, skip, hasMore } = prev;
      page++;
      skip += takeAmount;
      return {
        page, take, skip, hasMore
      }
    })
  }

  const prevHandler = () => {
    if (pagination.page <= 1) return;
    setPagination(prev => {
      let { page, take, skip, hasMore } = prev;
      page--;
      skip -= takeAmount;
      return {
        page, take, skip, hasMore
      }
    })
  }

  return (
    <GridContainer>
      {
        data?.getRespondents.items.map((respondent, index) => {
          return <GridItem xs={12} sm={12} md={12} key={index}>
            <div className={classes.respondentCard}>
              <div className={classes.cardHeader}>
                <div>
                  <h4 className={classes.cardTitleWhite}>
                    Encuestado {respondent.id}
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    Puntaje promedio: {respondent.avgScore}
                  </p>
                </div>
                <div className={classes.cardButtons}>
                  <div className={classes.cardButton}>
                    <Link to={`/admin/encuestados/${respondent.uuid}`} >
                      <Button type="button" color="info" size="sm">
                        <span className="material-icons">
                          visibility
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </GridItem>
        })
      }
      <br />
      <button onClick={prevHandler}>Prev</button>
      <button>{pagination.page}</button>
      <button onClick={() => nextHandler()}>Next</button>
    </GridContainer>
  );
}

const styles = createStyles({
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 300,
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: 400,
      lineHeight: 1
    }
  },
  respondentCard: {
    marginTop: '8px',
    marginBottom: '8px',
    padding: '10px',
    borderRadius: '5px',
    background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
    border: '1px solid #e0e0e0',
    '&:hover': {
      border: '1px solid #e0e0e0',
    }
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
    "@media (max-width: 700px)": {
      flexDirection: 'column'
    }
  },
  cardButtons: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'end',
    "@media (max-width: 700px)": {
      justifyContent: 'center'
    }
  },
  cardButton: {
    margin: 5
  }
});

export default withStyles(styles)(Respondents);
