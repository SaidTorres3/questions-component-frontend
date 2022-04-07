import React, { useEffect, useState } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import { createStyles } from "@material-ui/core";
import Button from "../../components/CustomButtons/Button";
import { Link } from "react-router-dom";
import {
  useGetRespondentsQuery,
  useDeleteRespondentMutation,
} from "./operations.gql";
import { GetRespondentsSortBy, SortDirection } from "src/graphql";
import { Rating } from "react-simple-star-rating";

function Respondents(props: any) {
  const { classes } = props;
  const take = 6;
  const [pagination, setPagination] = useState({
    page: 1,
    take: take,
    skip: 0,
    hasMore: true,
  });

  const { data } = useGetRespondentsQuery({
    variables: {
      sort: {
        direction: SortDirection.Desc,
        by: GetRespondentsSortBy.Id,
      },
      take: pagination.take,
      skip: pagination.skip,
    },
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    pollInterval: 500,
  });

  const deleteRespondent = () => {
    deleteRespondentMutation({
      variables: {
        input: {
          respondentUuid: modalData.respondentUuid,
        },
      },
      context: {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    });
    closeModal();
  };

  const [modalData, setModalData] = useState({
    showModal: false,
    respondentUuid: "",
    respondentNo: "0",
  });

  const [deleteRespondentMutation] = useDeleteRespondentMutation();

  useEffect(() => {
    if (!data) return;
    setPagination((prev) => {
      return {
        ...prev,
        hasMore: data.getRespondents.hasMore,
      };
    });
  }, [data]);

  useEffect(() => {
    console.log("eje");
    window.addEventListener("keydown", keyListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToTop = () => {
    const element = document.getElementById("mainPanel");
    element?.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (!pagination.hasMore) return;
    scrollToTop();
    setPagination((prev) => {
      return {
        ...prev,
        page: prev.page + 1,
        skip: prev.skip + prev.take,
      };
    });
  };

  const handlePrevPage = () => {
    if (pagination.page <= 1) return;
    scrollToTop();
    setPagination((prev) => {
      return {
        ...prev,
        page: prev.page - 1,
        skip: prev.skip - prev.take,
      };
    });
  };

  const closeModal = () => {
    setModalData({
      respondentUuid: "",
      showModal: false,
      respondentNo: "0",
    });
  };

  const keyListener = (e: any) => {
    console.log(e);
    console.log(data);

    if (
      e.keyCode === 39 &&
      data?.getRespondents.total &&
      pagination.page + 1 < Math.ceil(data?.getRespondents.total / take)
    ) {
      handleNextPage();
    } else if ((e.keyCode === 37 || e.keyCode === 8) && pagination.page > 1) {
      handlePrevPage();
    }
  };

  return (
    <div>
      {modalData.showModal ? (
        <div id="modal" className={classes.modal}>
          <h1 className={classes.modalMsg}>
            ¿Desea eliminar la encuesta {modalData.respondentNo}?
          </h1>
          <div className={classes.modalButtonsContainer}>
            <Button
              className={classes.modalButton}
              color="danger"
              onClick={() => deleteRespondent()}
            >
              Eliminar
            </Button>
            <Button
              className={classes.modalButton}
              color="warning"
              onClick={() => closeModal()}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : null}
      <GridContainer>
        {data?.getRespondents.items.map((respondent, index) => {
          return (
            <GridItem xs={12} sm={12} md={12} key={index}>
              <div className={classes.respondentCard}>
                <div className={classes.cardHeader}>
                  <div>
                    <h4 className={classes.cardTitleWhite}>
                      Encuestado {respondent.id} ---{" "}
                      {new Date(respondent.createdAt).toLocaleString("en-US")}
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                      Puntaje promedio: {respondent.avgScore}
                      <Rating
                        initialValue={respondent.avgScore}
                        ratingValue={0}
                        readonly
                      ></Rating>
                    </p>
                  </div>
                  <div className={classes.cardButtons}>
                    <div className={classes.cardButton}>
                      <Link to={`/admin/encuestados/${respondent.uuid}`}>
                        <Button type="button" color="info" size="sm">
                          <span className="material-icons">visibility</span>
                        </Button>
                      </Link>
                      <Button
                        type="button"
                        size="sm"
                        style={{ marginLeft: "5px" }}
                        color="danger"
                        onClick={() =>
                          setModalData({
                            respondentUuid: respondent.uuid,
                            showModal: true,
                            respondentNo: respondent.id,
                          })
                        }
                      >
                        <span className="material-icons">delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </GridItem>
          );
        })}
        <br />
        <div className={classes.paginationButtonsContainer}>
          <Button onClick={handlePrevPage} color="warning">
            Prev
          </Button>
          <div style={{ margin: 8 }}>
            {pagination.page} /{" "}
            {data?.getRespondents.total
              ? Math.ceil(data?.getRespondents.total / take)
              : 0}
          </div>
          <Button onClick={handleNextPage} color="success">
            Next
          </Button>
        </div>
      </GridContainer>
    </div>
  );
}

const styles = createStyles({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: 400,
      lineHeight: 1,
    },
  },
  respondentCard: {
    marginTop: "8px",
    marginBottom: "8px",
    padding: "10px",
    borderRadius: "5px",
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    border: "1px solid #e0e0e0",
    "&:hover": {
      border: "1px solid #e0e0e0",
    },
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    "@media (max-width: 700px)": {
      flexDirection: "column",
    },
  },
  cardButtons: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "end",
    "@media (max-width: 700px)": {
      justifyContent: "center",
    },
  },
  cardButton: {
    margin: 5,
  },
  modal: {
    position: "fixed",
    height: "100%",
    width: "100vw",
    left: 0,
    top: 0,
    backgroundColor: "#000000ac",
    zIndex: 10000,
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  modalMsg: {
    color: "#fff",
    textAlign: "center",
  },
  modalButtonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  modalButton: {
    margin: 10,
    height: "40px",
    width: "100px",
  },
  paginationButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default withStyles(styles)(Respondents);
