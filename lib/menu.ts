export type MenuItem = {
  id: string;
  name: string;
  price: number;
  desc: string;
  img: string;
  popular?: boolean;
};

export const IMG_BASE = "https://images.deliveryhero.io/image/fd-pk/products/";

// Unchanged from the current site — same categories, items, prices and images.
export const MENU: Record<string, MenuItem[]> = {
  "Popular": [
    { id: "p1", name: "Chow Mein", price: 449, desc: "Stir-fried noodles with vegetables, savory and flavorful.", img: "45330196", popular: true },
    { id: "p2", name: "Panini Grilled Sandwich", price: 599, desc: "Two slices filled with grilled chicken fillet, cheese, veggies & sauce.", img: "3935069", popular: true },
    { id: "p3", name: "Mexican Beef Grilled Burger", price: 699, desc: "Double patty grilled beef topped with spicy Mexican sauce, lettuce & veggies.", img: "4592766", popular: true },
    { id: "p4", name: "Mexican Grilled Burger", price: 649, desc: "Grilled juicy chicken fillet topped with lettuce, veggies & spicy Mexican sauce.", img: "3934700", popular: true },
    { id: "p5", name: "Chicken Chilli Dry With Any Rice", price: 854, desc: "Spicy chicken stir-fried with vegetables, served with rice.", img: "45328871", popular: true },
    { id: "p6", name: "Pesto Grilled Sandwich", price: 649, desc: "Grilled chicken fillet, veggies, cheese & Harry & G's pesto sauce.", img: "3935070", popular: true }
  ],
  "Chicken Grill Burgers": [
    { id: "cg1", name: "Tower Grilled Burger", price: 799, desc: "Double-storied juicy grilled chicken fillet with lettuce & double sauce.", img: "3934699" },
    { id: "cg2", name: "Jalapeno Grilled Burger", price: 649, desc: "Grilled chicken fillet topped with jalapeno, lettuce & sauce.", img: "3934703" },
    { id: "cg3", name: "Chicken Grilled Burger", price: 599, desc: "Grilled juicy chicken fillet topped with lettuce, veggies & sauce.", img: "3934701" },
    { id: "cg4", name: "Chicken American Grill Burger", price: 999, desc: "Olives, jalapeno, mushrooms, caramelized onion & lettuce.", img: "10767203" },
    { id: "cg5", name: "Chicken Grill Messy Mushroom", price: 999, desc: "Olives, jalapeno, mushrooms, caramelized onion, lettuce, cheese & sauce.", img: "10767204" },
    { id: "cg6", name: "Black Pepper Chicken Burger", price: 1199, desc: "Grilled fillet topped with cheese patty & signature black pepper sauce.", img: "95087849" },
    { id: "cg7", name: "Butter Chicken Burger", price: 1199, desc: "Grilled fillet with cheese patty & signature butter chicken sauce.", img: "95087850" },
    { id: "cg8", name: "Grilled Chicken Burger", price: 549, desc: "Grilled juicy fillet with lettuce and special sauce.", img: "95087845" },
    { id: "cg9", name: "Lava Burger", price: 1199, desc: "Grilled fillet, cheese patty, signature sauce & fresh veggies.", img: "95087848" }
  ],
  "Beef Burgers": [
    { id: "bb1", name: "Butter Beef Burger", price: 1199, desc: "Grilled juicy patty with famous butter beef sauce. Served with fries.", img: "95087847" },
    { id: "bb2", name: "American Beef Grill Burger", price: 999, desc: "Caramelized onion, sautéed mushrooms, cheese, veggies & sauce.", img: "4592778" },
    { id: "bb3", name: "Lava Beef Grill Burger", price: 999, desc: "Beef patty stuffed with mozzarella cheese, lettuce & veggies.", img: "4592789" },
    { id: "bb4", name: "Jalapeno Beef Grilled Burger", price: 699, desc: "Grilled beef patty topped with lettuce, veggies, jalapeno & sauce.", img: "4592774" },
    { id: "bb5", name: "Signature Beef Grill Burger", price: 899, desc: "Herbs, lettuce, veggies, signature sauce & cheese.", img: "4592794" },
    { id: "bb6", name: "Messy Mushroom Beef Burger", price: 999, desc: "Mushroom sauce, lettuce & cheese.", img: "4592771" },
    { id: "bb7", name: "Peri Peri Beef Grill Burger", price: 999, desc: "Lettuce, veggies, peri peri sauce & cheese.", img: "4592779" },
    { id: "bb8", name: "Beef Grilled Burger", price: 599, desc: "Double patty grilled beef with lettuce, veggies & sauce.", img: "4592780" },
    { id: "bb9", name: "Black Pepper Beef Burger", price: 1199, desc: "Grilled patty with signature butter beef sauce.", img: "95087846" }
  ],
  "Fresh & Fried Burgers": [
    { id: "ff1", name: "BBQ Zinger Burger", price: 599, desc: "Crispy chicken fillet topped with lettuce & BBQ sauce.", img: "10901620" },
    { id: "ff2", name: "Zinger Burger", price: 499, desc: "Crispy chicken fillet topped with lettuce and sauce.", img: "10901622" },
    { id: "ff3", name: "Jalapeno Zinger Burger", price: 599, desc: "Crispy chicken fillet, lettuce, jalapeno & sauce.", img: "10901618" },
    { id: "ff4", name: "Zinger Peri Peri Burger", price: 599, desc: "Crispy chicken fillet with lettuce & peri peri sauce.", img: "10901619" },
    { id: "ff5", name: "Mexican Zinger Burger", price: 599, desc: "Crispy chicken fillet with lettuce & Mexican sauce.", img: "10901621" },
    { id: "ff6", name: "Mighty Zinger Burger", price: 699, desc: "Double-storied crispy fillet with cheese, lettuce & sauce.", img: "10901623" },
    { id: "ff7", name: "Zinger Crunch (Kid Meal)", price: 399, desc: "A smaller portion, perfect for kids.", img: "21094737" },
    { id: "ff8", name: "Chicken Patty Burger", price: 299, desc: "Crispy, crunchy fillet topped with lettuce and sauce.", img: "95087844" },
    { id: "ff9", name: "Signature Zinger", price: 749, desc: "Crispy, crunchy fillet topped with lettuce and sauce.", img: "95087843" }
  ],
  "Panini Sandwich": [
    { id: "pn1", name: "BBQ Sandwich", price: 649, desc: "Three slices with chicken tossed in BBQ sauce, lettuce & cheese.", img: "3935068" },
    { id: "pn2", name: "Club Sandwich", price: 649, desc: "Three slices with chicken, fried egg, veggies & cheese.", img: "3935071" },
    { id: "pn3", name: "Pizza Sandwich", price: 699, desc: "Two layers topped with cheese, chicken, tomato & olives.", img: "10939677" }
  ],
  "Chicken Steaks": [
    { id: "st1", name: "Tarragon Chicken Steak", price: 1299, desc: "Juicy fillet, homemade creamy tarragon sauce, sautéed veggies & fries.", img: "3935145" },
    { id: "st2", name: "Black Pepper Steak", price: 1299, desc: "Juicy fillet, homemade black pepper sauce, sautéed veggies & fries.", img: "3935148" },
    { id: "st3", name: "Mushroom Steak", price: 1299, desc: "Juicy fillet, homemade creamy mushroom sauce, sautéed veggies & fries.", img: "3935146" }
  ],
  "Our Special": [
    { id: "os1", name: "Harry & G Signature Burger", price: 899, desc: "Juicy grilled chicken/beef patty, herbs, lettuce, signature sauce & cheese.", img: "3934848" },
    { id: "os2", name: "Crunchy Monster Burger", price: 799, desc: "Juicy crunchy breast fillet, signature sauce, lettuce & cheese.", img: "3934847" }
  ],
  "Pizza": [
    { id: "pz1", name: "BBQ Pizza", price: 598, desc: "Cheese, capsicum, olives, onion, herbs, BBQ sauce & chicken.", img: "7401353" },
    { id: "pz2", name: "Margherita Pizza", price: 599, desc: "Cheese, sliced tomato, Italian & oregano herbs, basil leaf.", img: "7401354" },
    { id: "pz3", name: "Chicken Cheese Lover Pizza", price: 699, desc: "Loaded with cheese & chicken, onion, jalapenos & spicy sauce.", img: "7401455" },
    { id: "pz4", name: "Grilled Chicken Pizza", price: 599, desc: "Cheese, capsicum, olives, onion, herbs & chicken.", img: "7401345" },
    { id: "pz5", name: "Four Square Pizza", price: 697, desc: "Cheese, capsicum, onion, chicken, basil, olives, mushrooms & jalapeno.", img: "7401400" },
    { id: "pz6", name: "Pepperoni Pizza", price: 599, desc: "Cheese, pepperoni, sausages, herbs & tomato sauce.", img: "7401401" },
    { id: "pz7", name: "Harry & G Pizza", price: 749, desc: "Special sauce, chicken, cheese, sweetcorn, capsicum, mushroom, olives & jalapenos.", img: "7401402" },
    { id: "pz8", name: "Stuffed Crust Pizza", price: 649, desc: "Special sauce, chicken, cheese, onion, olives, sausages & capsicum.", img: "7401451" },
    { id: "pz9", name: "Thin Crust Pizza", price: 599, desc: "Cheese, capsicum, chicken, onion, sausages & herbs.", img: "7401453" },
    { id: "pz10", name: "Fajita Pizza", price: 599, desc: "Fajita chicken, cheese, capsicum, onion & oregano herbs.", img: "7401922" }
  ],
  "Chinese": [
    { id: "ch1", name: "Fried Rice", price: 404, desc: "Stir-fried rice with vegetables, eggs & savory seasoning.", img: "45323641" },
    { id: "ch2", name: "Gravy", price: 449, desc: "Savory sauce made from meat drippings, served with rice or noodles.", img: "45327358" },
    { id: "ch3", name: "Chicken Manchurian With Any Rice", price: 852, desc: "Spicy chicken stir-fried with vegetables over rice.", img: "45328872" },
    { id: "ch4", name: "Chicken Shashlik With Any Rice", price: 854, desc: "Grilled chicken skewers with flavorful, spiced rice.", img: "45328874" },
    { id: "ch5", name: "Chicken Sweet Thai Chilli", price: 899, desc: "Tender chicken in sweet and spicy Thai chili sauce.", img: "45328879" }
  ],
  "Calzone & Burrito": [
    { id: "cb1", name: "Calzone", price: 899, desc: "Filled with chicken, cheese & veggies.", img: "10779274" },
    { id: "cb2", name: "Chicken Burrito", price: 599, desc: "Filled with grilled chicken, veg & sauces.", img: "10779275" }
  ],
  "Wraps": [
    { id: "wr1", name: "Zinger Wrap", price: 399, desc: "Crispy chicken & veggies wrapped in bread.", img: "3935273" },
    { id: "wr2", name: "Grilled Chicken Wrap", price: 399, desc: "Juicy grilled chicken, veggies & pesto sauce.", img: "3935272" },
    { id: "wr3", name: "BBQ Wrap", price: 399, desc: "Chicken tossed in BBQ sauce with veggies.", img: "3935270" },
    { id: "wr4", name: "Mexican Wrap", price: 399, desc: "Spicy chicken tossed with chili & veggies.", img: "3935271" }
  ],
  "Wings": [
    { id: "wg1", name: "Hot Chili Grilled Wings", price: 449, desc: "6 pieces, grilled with hot chili.", img: "3935296" },
    { id: "wg2", name: "BBQ Grilled Wings", price: 449, desc: "6 pieces, grilled with BBQ sauce.", img: "3935299" },
    { id: "wg3", name: "Plain Fried Wings", price: 449, desc: "6 pieces, classic fried.", img: "3935297" },
    { id: "wg4", name: "Harry & G Wings", price: 499, desc: "6 pieces, served with cheese sauce.", img: "3935298" },
    { id: "wg5", name: "Garlic Mayo Wings", price: 499, desc: "6 pieces with garlic mayo.", img: "3935295" }
  ],
  "Fries & Sides": [
    { id: "fr1", name: "Plain Fries", price: 299, desc: "Small / Medium / Large.", img: "3935371" },
    { id: "fr2", name: "Loaded Fries", price: 449, desc: "Small / Medium / Large.", img: "3935374" },
    { id: "fr3", name: "Mayo Fries", price: 349, desc: "Small / Medium / Large.", img: "3935372" },
    { id: "fr4", name: "Cheese Fries", price: 349, desc: "Small / Medium / Large.", img: "3935375" },
    { id: "fr5", name: "Cheese Slice", price: 70, desc: "Single serving side.", img: "5795950" },
    { id: "fr6", name: "Olive", price: 50, desc: "Serves 1.", img: "5795951" }
  ],
  "Beverages": [
    { id: "bv1", name: "Water", price: 90, desc: "Single serving.", img: "3935397" },
    { id: "bv2", name: "Cold Drink", price: 119, desc: "Regular drink.", img: "36254830" },
    { id: "bv3", name: "1.5 Litre Drink", price: 299, desc: "Coke or Sprite.", img: "36254838" }
  ]
};
