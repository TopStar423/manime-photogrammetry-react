import Header from './Header';
import { Row, Column } from './Responsive';

const Layout = (props) => (
  <div style={{styles}}>
    <Header />
    {props.children}
    <Row>
      <Column xs='12' sm='6' md='8' >
        md: 8 - sm: 6 - xs: 12
      </Column>
      <Column xs='6' md='4' backgroundColor="#0000ff">
        md: 4 - xs: 6
      </Column>
    </Row>
  </div>
);

const styles = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

export default Layout;
