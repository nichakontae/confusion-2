import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import Dishdetail from "./DishsdetailComponent";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = ({ match }) => {
      return (
        <Dishdetail
          comments={this.props.comments}
          dishes={this.props.dishes}
          selectedDish={match.params.dishId}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => (
              <Menu
                dishes={this.props.dishes}
                // comments={this.state.comments.filter((comment) => {
                //   return comment.dishId === this.state.selectedDish;
                // })}
                // selectedDish={
                //   this.state.dishes.filter((dish) => {
                //     return dish.id === this.state.selectedDish;
                //   })[0]
                // }
                // onClick={(dishId) => this.onDishSelect(dishId)}
              />
            )}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
