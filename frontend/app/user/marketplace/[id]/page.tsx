import ProductD from "@/components/dashboard/details/ProductD"
import React from "react"

const ProductDetails = ({ params }: { params: { id: string } }) => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <ProductD id={params.id} />
        </main>
    )
}

export default ProductDetails