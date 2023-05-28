import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { addCommentFilmAction } from 'src/store/api-actions';
import { getAddCommentLoading } from 'src/store/films-process/selectors';
import { getTestId } from 'src/utils/main';
import { AddCommentSchema } from 'src/utils/validate';

type TAddReviewForm = {
  backgroundColor: string;
};

enum FormFieldName {
  Rating = 'rating',
  Text = 'review-text',
}

const AddReviewForm = ({ backgroundColor }: TAddReviewForm) => {
  const loading = useAppSelector(getAddCommentLoading);
  const { id: currentFilmId } = useParams();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    [FormFieldName.Rating]: 0,
    [FormFieldName.Text]: '',
  });
  const formSubmitHandler = (evt: FormEvent) => {
    evt.preventDefault();

    if (currentFilmId) {
      dispatch(
        addCommentFilmAction({
          filmId: Number(currentFilmId),
          comment: formData[FormFieldName.Text],
          rating: formData[FormFieldName.Rating],
        }),
      );
    }
  };
  const onChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = evt.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { error: validError } = AddCommentSchema.validate({
    rating: formData[FormFieldName.Rating],
    text: formData[FormFieldName.Text],
  });

  const isEmpty = !(formData[FormFieldName.Rating] || formData[FormFieldName.Text]);

  return (
    <div className="add-review">
      <form className="add-review__htmlForm" onSubmit={formSubmitHandler}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: 10 }, (_, idx) => idx + 1)
              .reverse()
              .map((count) => {
                const isCurrent = count === Number(formData.rating);

                return (
                  <Fragment key={count}>
                    <input
                      className="rating__input"
                      id={`star-${count}`}
                      type="radio"
                      name={FormFieldName.Rating}
                      value={count}
                      onChange={onChange}
                      checked={isCurrent}
                      disabled={loading}
                    />
                    <label className="rating__label" htmlFor={`star-${count}`}>
                      Rating {count}
                    </label>
                  </Fragment>
                );
              })}
          </div>
        </div>

        <div className="add-review__text" style={{ backgroundColor }}>
          <textarea
            className="add-review__textarea"
            name={FormFieldName.Text}
            id={FormFieldName.Text}
            placeholder="Review text"
            onChange={onChange}
            value={formData[FormFieldName.Text]}
            minLength={10}
            maxLength={400}
            disabled={loading}
            {...getTestId('textarea')}
          />
          <span className="add-review__counter">{formData[FormFieldName.Text].length}</span>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!!validError || loading}>
              Post
            </button>
          </div>
        </div>
      </form>
      {validError && !isEmpty && <p className="add-review__error-message">{validError.message}</p>}
    </div>
  );
};

export default AddReviewForm;
