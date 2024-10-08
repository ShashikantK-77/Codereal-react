import { Card } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import

import PageTitle from "components/Typography/PageTitle";
import Terms from '../utils/Terms'

const TermsCondition = () => {
    //   const { errors, register, handleSubmit, onSubmit, isSave, isSubmitting } = useSettingSubmit();

    const { t } = useTranslation();

    return (
        <>
            <PageTitle>{t("TermsConditions")}</PageTitle>
            <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
                <Card>
                    {Terms.map((term, index) => (
                        <Card key={index}>
                            <PageTitle>{term.Tittle}</PageTitle>
                            <p>{term.Paragraph}</p>
                        </Card>
                    ))}
                </Card>

            </div>
        </>
    );
};
export default TermsCondition;
