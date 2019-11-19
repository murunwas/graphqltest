import {
  Resolver,
  Query,
  Field,
  ObjectType,
  Float
} from "type-graphql";

import axios from "axios"

// @ObjectType()
// class Info {
//   @Field()
//   img: string;

//   @Field()
//   fullname: string;
// }

@ObjectType()
class TestDTO {
  @Field()
  title: string;

  // @Field(() => Info)
  // info: Info;

  @Field()
  img: string;

  @Field()
  name: string;

  @Field(() => Float)
  zar: number;

  @Field(() => Float)
  usd: number;
}

@Resolver()
export class CryptoResolver {
  @Query(() => [TestDTO])
  async crypto() {
 

    try {
      const {data:{data,status}} = await axios.get("https://myapi.ga/")
      if (status) {
        return  data.map((coin:any)=>{
          const me = new TestDTO();
         // const info =new Info();

          //info.fullname  =coin.info.fullname;
         // info.img  =coin.info.img;
         const [zar,usd]=coin.value;
          me.title = coin.key;
          me.img=`https://www.cryptocompare.com${coin.info.img}`;
          me.name =coin.info.fullname;
          me.zar =zar.amount;
          me.usd =usd.amount;
          return me;
         });
      }
    } catch (error) {
      
    }
    
    return [new TestDTO()];
  }
}
