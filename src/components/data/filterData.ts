import { IFilterType } from "../../interface/filterData";
import image1 from "../../assets/images/filter/filter1.jpeg";
import image2 from "../../assets/images/filter/filter2.jpeg";
import image3 from "../../assets/images/filter/filter3.jpeg";
import image4 from "../../assets/images/filter/filter4.jpeg";

const filterData: IFilterType[] = [
  { id: 1, image: image1, title: "Top Rated" },
  {
    id: 2,
    image: image2,
    title: "Most Reviewed",
  },
  // {
  //   id: 3,
  //   image: image3,
  //   title: "Amazing pools",
  // },
];

export default filterData;
