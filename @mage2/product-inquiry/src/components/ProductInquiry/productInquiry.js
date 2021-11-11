import React, { Suspense } from "react";
import { ChevronDown as ArrowDown, ChevronUp as ArrowUp } from 'react-feather';
import { FormattedMessage } from "react-intl";
import { useProductInquiry } from '../../talons/useProductInquiry';
import Button from "@magento/venia-ui/lib/components/Button";
import Icon from "@magento/venia-ui/lib/components/Icon";
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";

import ProductInquiryOperations from '../../queries/productInquiry.gql';
import defaultClasses from './productInquiry.css';

const CreateModal = React.lazy(() => import('./createModal'));

const ProductInquiry = props => {
    const { productSku } = props;
    const classes = defaultClasses;

    const inquiryProps = useProductInquiry({
        ...ProductInquiryOperations,
        productSku
    });

    const {
        handleCancel,
        formErrors,
        handleSubmit,
        isDisabled,
        isUpdateMode,
        showUpdateMode,
        displaySuccess,
        inquiriesErrors,
        isLoadingInquiries,
        inquiriesData,
        showViewMode,
        isOpen
    } = inquiryProps;

    const successMessage = displaySuccess ?
        (<div className={classes.success}>
            <FormattedMessage
                id={'ProductInquiry.successMessage'}
                defaultMessage={'Thank you for inquiry. Our team will contact you soon.'}
            />
        </div>) : null;

    const view_content = isOpen ? classes.show_view : classes.hide_view;
    const titleIconSrc = isOpen ? ArrowUp : ArrowDown;
    const titleIcon = <Icon src={titleIconSrc} size={24} />;

    const loadingInquiry = (isLoadingInquiries) ? (
        <LoadingIndicator>
            <FormattedMessage
                id={'productInquiry.loading'}
                defaultMessage={'Loading Product Inquiry...'}
            />
        </LoadingIndicator>
    ) : null;

    const inquiryErrors = (inquiriesErrors) ? (
        <span className={classes.errorText}>
                <FormattedMessage
                    id={'productInquiry.errorLoading'}
                    defaultMessage={
                        'There was an error loading product inquiries. Please refresh and try again.'
                    }
                />
            </span>
    ) : null;

    let inquiryContent = null;

    if (inquiriesData.length > 0) {
        const inquiryList = inquiriesData.map(inquiry => {
            const { message, admin_message } = inquiry;
            return (
                <div>
                    <div>
                        <strong>
                            <FormattedMessage
                                id={'productInquiry.question'}
                                defaultMessage={'Question: '}
                            />
                        </strong>
                        {message}
                    </div>
                    <div>
                        <strong>
                            <FormattedMessage
                                id={'productInquiry.answer'}
                                defaultMessage={'Answer: '}
                            />
                        </strong>
                        {admin_message}
                    </div>
                </div>
            );
        });
        inquiryContent = (
            <div className={classes.inquiryList}>{inquiryList}</div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.messages}>
                {successMessage}
            </div>
            <div className={classes.inquiryButtonContainer}>
                <Button
                    id={'btn-product-inquiry'}
                    className={classes.inquiryButton}
                    disabled={false}
                    onClick={showUpdateMode}
                    priority="normal"
                >
                    <FormattedMessage
                        id={'productInquiry.inquiry'}
                        defaultMessage={'Product Inquiry'}
                    />
                </Button>
            </div>
            <Suspense fallback={null}>
                <CreateModal
                    formErrors={formErrors}
                    isDisabled={isDisabled}
                    isOpen={isUpdateMode}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                    productSku={productSku}
                />
            </Suspense>
            <div className={classes.view_container}>
                <div className={classes.view_root}>
                    <Button
                        id={'btn-view-inquiry'}
                        className={classes.viewInquiryButton}
                        onClick={showViewMode}
                        disabled={false}
                        priority="normal"
                    >
                    <span className={classes.title_wrapper}>
                        <span className={classes.title}>
                            <FormattedMessage
                                id={'productInquiry.viewInquiry'}
                                defaultMessage={'View Product Inquiry'}
                            />
                        </span>
                        {titleIcon}
                    </span>
                    </Button>
                    <div className={view_content}>
                        {loadingInquiry}
                        {inquiryErrors}
                        {inquiryContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInquiry;
