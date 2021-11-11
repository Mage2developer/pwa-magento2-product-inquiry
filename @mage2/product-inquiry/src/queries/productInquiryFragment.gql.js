import { gql } from '@apollo/client';

export const ProductInquiryFragment = gql`
    fragment ProductInquiryFragment on Inquiry {
        inquiry_id
        name
        email
        mobile_number
        message
        sku
        status
        display_front
        admin_message
        created_at
    }
`;
