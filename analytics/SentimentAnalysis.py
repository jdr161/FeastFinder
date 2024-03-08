import yake

kw_extractor = yake.KeywordExtractor()
language = "en"
max_ngram_size = 1
deduplication_threshold = 0.1
num_of_keywords = 20
custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=num_of_keywords, features=None)


def keywords(txt):
    keywords = custom_kw_extractor.extract_keywords(txt)
    return keywords