from sentence_transformers import SentenceTransformer
from sklearn.base import BaseEstimator, TransformerMixin


class SentenceTransformerEncoder(BaseEstimator, TransformerMixin):
    def __init__(self, model_name="nomic-ai/nomic-embed-text-v1"):
        self.model = SentenceTransformer(model_name, trust_remote_code=True)
        self.model_name = model_name


    def fit(self, X, y=None):
        return self

    def transform(self, X):
        # Encode the text data into embeddings
        return self.model.encode(X.tolist())