import React, { lazy, Suspense } from 'react'
import _useEffect from '../../controllers/_initial';
import { Br, Icon, Loading, M_icon, P, Row, Scroll, Column } from '../../other/Components/Html'
import share from '../../other/utils/share';
import ImageDisplay from '../Components/ImageDisplay';
import CommentCard from '../Components/CommentCard';
import Specifications from '../Components/Specifications';
import Description from '../Components/Description';
import SliderOffers from '../Components/SliderHorizontal';
import Footer from '../Components/Footer';


let params = new URLSearchParams(location.search)

const SingleProduct = (p) => {

  return (
    <Column f={1} >
      <Scroll >
        <Row bgcolor='#fff' w='100%' h={50} jc='space-between' >
          <P pr={10} mt={14} fw='bold'>{params.get('title')}</P>
          <Row pr={10} mt={14} jc='space-around' w={100} >
            {p.bookmark ?
              <M_icon color='#ccc' size={17} name='bookmark' />
              :
              <M_icon color='#ccc' size={17} name='bookmark-border' />
            }
            <Icon color='#ccc' name='share-alt' size={17} onClick={async () => { share(location.href, 'دیجیکالا') }} />
            {/* {p.navigation.canGoBack() ? <Icon color='#ccc' name='arrow-left' size={17} onClick={() => { p.navigation.goBack() }} /> : <></>} */}
          </Row>
        </Row>
        <Br />
        <Column>
          <Column fd='row-reverse' fw={'wrap'} w='100%' jc='space-between' bgcolor='#fff' pb={25} >

            <Column fg={1} mt={20}>
              <Column w='98.5%'>
                  <Description {...p} />
              </Column>
            </Column>

            <Column fg={1} mt={20}>
              <Column w='98.5%'>
                  <ImageDisplay {...p} />
              </Column>
            </Column>

            <Column ai='center' fg={1} mt={20}>
              <Column ai='center' w='98%' as='center'>
                  <Specifications {...p} />
              </Column>
            </Column>

          </Column>
        </Column>
        <Br />




        <Column mv={8} >
            <CommentCard {...p} />
        </Column>

        <Column>
          <SliderOffers {...p} />
        </Column>

        <Column>
          <Footer {...p} />
        </Column>

      </Scroll>
    </Column>
  )
}

export default SingleProduct


