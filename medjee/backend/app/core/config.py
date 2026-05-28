from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "MEDJEE"
    API_V1_PREFIX: str = "/api/v1"
    UPLOAD_DIR: str = "storage/uploads"

    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/medjee"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()