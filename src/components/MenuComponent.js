import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

import DishDetail from "./DishsdetailComponent";

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

// function renderDish(dish) {
//   if (dish != null)
//     return (
//       <Card>
//         <CardImg top src={dish.image} alt={dish.name} />
//         <CardBody>
//           <CardTitle>{dish.name}</CardTitle>
//           <CardText>{dish.description}</CardText>
//         </CardBody>
//       </Card>
//     );
//   else return <div></div>;
// }

const Menu = (props) => {
  // const [selectedDish, setSelectedDish] = useState(null);
  // const onDishSelect = (dishId) => {
  //   setSelectedDish(dishId);
  // };
  const menu = props.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1" key={dish.id}>
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {menu}
        {/* <DishDetail dish={props.selectedDish} comment={props.comments} /> */}
      </div>
    </div>
  );
};

export default Menu;
