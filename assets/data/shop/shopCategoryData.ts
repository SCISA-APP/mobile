import Book from '../../../assets/categoryicon/Department.png';
import Light from '../../../assets/categoryicon/desklamp.png';
import Tshirt from '../../../assets/categoryicon/fashion.png';
import Love from '../../../assets/categoryicon/heart.png';
import Screen from '../../../assets/categoryicon/monitor.png';
import Dumbell from '../../../assets/categoryicon/sports.png';
import { Category } from '@/types/models/shop/categoryShop';

const categoryData: Category[] = [
  { id: '1', name: 'Fashion', icon: Tshirt },
  { id: '2', name: 'Home & Kitchen', icon: Light },
  { id: '3', name: 'Beauty', icon: Love },
  { id: '4', name: 'Sports & Outdoors', icon: Dumbell },
  { id: '5', name: 'Phone & Accessories', icon: Screen },
  { id: '6', name: 'Department', icon: Book },
];
export const categories = ["Beauty","Fashion", 'Electronics', 'Food', 'Books', 'Accessories', "Department"];

export default categoryData;
