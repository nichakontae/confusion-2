import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      rating: "1",
      author: "",
      comment: "",
      touched: {
        author: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  validate(author) {
    const errors = {
      author: "",
    };

    if (this.state.touched.author && author.length < 3)
      errors.author = "Must be greater than 2 characters";
    else if (this.state.touched.author && author.length > 15)
      errors.author = "Must be 15 characters or less";

    return errors;
  }

  render() {
    const errors = this.validate(this.state.author);
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    type="select"
                    id="rating"
                    name="rating"
                    value={this.state.rating}
                    onChange={this.handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </Col>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  type="text"
                  id="author"
                  name="author"
                  valid={errors.author === ""}
                  invalid={errors.author !== ""}
                  onBlur={this.handleBlur("author")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.author}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="message">Comment</Label>
                <Col>
                  <Input
                    type="textarea"
                    id="comment"
                    name="comment"
                    rows="6"
                    value={this.state.comment}
                    onChange={this.handleInputChange}
                  ></Input>
                </Col>
              </FormGroup>

              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-sign-in fa-lg"></span> Submit Comment
        </Button>
      </div>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
  }
  renderDish() {
    const dish = this.props.dishes[this.props.selectedDish];
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }
  renderComments() {
    const dish = this.props.dishes[this.props.selectedDish];
    const comments = this.props.comments.filter(
      (comment) => comment.dishId === dish.id
    );
    if (dish != null) {
      return (
        <Card>
          <CardTitle>
            <h4>Comments</h4>
          </CardTitle>
          <CardBody className="ps-0 m-0">
            <ul className="list-group list-group-flush list-unstyled">
              {comments.map((comment) => {
                return (
                  <li
                    key={comment.id}
                    className="list-group-item list-untiled ps-0 m-0"
                  >
                    {comment.comment}
                    <br />
                    {"--" + comment.author + ", "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </li>
                );
              })}
            </ul>
          </CardBody>
          <CommentForm />
        </Card>
      );
    } else return <div></div>;
  }

  render() {
    const dish = this.props.dishes[this.props.selectedDish];
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 mx-1 my-1">{this.renderDish()}</div>
          <div className="col-12 col-md-5 mx-1 my-1">
            {this.renderComments()}
          </div>
        </div>
      </div>
    );
  }
}
export default Dishdetail;
