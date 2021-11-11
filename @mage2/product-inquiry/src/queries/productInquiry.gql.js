import { gql } from '@apollo/client';
import { ProductInquiryFragment } from "./productInquiryFragment.gql";

export const CREATE_INQUIRY = gql`
    mutation CreateInquiry($inquiryInput: InquiryInput!) {
        createInquiry(input: $inquiryInput)
        @connection(key: "createInquiry") {
            inquiry {
                inquiry_id
                ...ProductInquiryFragment
            }
        }
    }
    ${ProductInquiryFragment}
`;

export const GET_INQUIRIES = gql`
    query getInquiries($sku: String!, $displayFront: Int = 1) {
        inquiry(sku:$sku, display_front:$displayFront) {
            totalCount
            items {
                inquiry_id
                ...ProductInquiryFragment
            }
        }
    }
    ${ProductInquiryFragment}
`;

export default {
    mutations: {
        createInquiryMutation: CREATE_INQUIRY
    },
    queries: {
        getProductInquiries: GET_INQUIRIES
    }
};
