import { Column } from '../../other/Components/Html'
import FlatlistChild from '../Components/FlatlistChild'

const Products = (p) => {
  return (
    <Column f={1} >
      <Column fd='row-reverse' w='100%' f={1} mt={8} >
        <Column f={5} >
          <FlatlistChild {...p} />
        </Column>
      </Column>
    </Column>
  )
}

export default Products 
