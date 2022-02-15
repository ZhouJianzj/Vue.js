import Vue from 'vue'

import {Message,Form,FormItem,Button,Input,Header,Aside,Main,Container,
Menu,MenuItem,Submenu,Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,
    Pagination,Carousel,CarouselItem,Dialog,Select,Option,MessageBox,Tag,DatePicker
,Avatar,Image} from "element-ui";

Vue.use(Image)
Vue.use(Avatar)
Vue.use(DatePicker)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(CarouselItem)
Vue.use(Carousel)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


