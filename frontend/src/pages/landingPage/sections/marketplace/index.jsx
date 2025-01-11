import avatar1sm from "../../../../assets/images/avatars/avatar1sm.png";
import nft4 from "../../../../assets/images/nfts/nft4.png";
import nft5 from "../../../../assets/images/nfts/nft5.png";
import nft6 from "../../../../assets/images/nfts/nft6.png";
import nft7 from "../../../../assets/images/nfts/nft7.png";
import MarketplaceFeaturedNftCard from "./MarketplaceFeaturedNftCard";
import MarketplaceOtherNftCard from "./MarketplaceOtherNftCard";
import MarketplaceStatistics from "./MarketplaceStatistics";

const marketplaceNftCardData = [
    {
        id: 1,
        nftImg: nft4,
        ownerImg: avatar1sm,
        title: 'The Futr Abstr',
        stockCount: 10,
        price: 4000,
        motionDelay: 0.3
    },
    {
        id: 2,
        nftImg: nft5,
        ownerImg: avatar1sm,
        title: 'The Futr Abstr',
        stockCount: 8,
        price: 1322,
        motionDelay: 0.5
    },
    {
        id: 3,
        nftImg: nft6,
        ownerImg: avatar1sm,
        title: 'The Futr Abstr',
        stockCount: 8,
        price: 2000,
        motionDelay: 0.7
    },
    {
        id: 4,
        nftImg: nft7,
        ownerImg: avatar1sm,
        title: 'The Futr Abstr',
        stockCount: 8,
        price: 3000,
        motionDelay: 0.9
    },
];

export default function Marketplace() {
    return (
        <section
            id="marketplace"
            aria-label="marketplace section"
            className="bg-neutral-100"
        >
            <div className="container tablet:px-10 laptop:px-20 | py-32">
                <div className="grid grid-cols-2 min-[1325px]:flex min-[1325px]:flex-row min-[1325px]:justify-between gap-y-20">
                    <div className="col-span-2 | grid grid-flow-row min-[435px]:grid-cols-2 gap-x-[52px] gap-y-10">
                        {marketplaceNftCardData.map(nftCardItem => (
                            nftCardItem.id === 1
                                ? <MarketplaceFeaturedNftCard
                                    key={nftCardItem.id}
                                    nftCardItem={nftCardItem}
                                    extraClasses="row-span-3 min-[435px]:max-[800px]:col-span-2"
                                />
                                : <MarketplaceOtherNftCard
                                    key={nftCardItem.id}
                                    nftCardItem={nftCardItem}
                                    extraClasses=""
                                />
                        ))}
                    </div>

                    <MarketplaceStatistics extraClasses="max-[800px]:col-span-2 | min-[1325px]:pl-9 min-[1325px]:border-l min-[1325px]:border-solid min-[1325px]:border-neutral-400" />
                </div>
            </div>
        </section>
    );
}
